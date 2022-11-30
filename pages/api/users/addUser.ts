import type { NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection, ObjectId} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp';
import streamifier from 'streamifier'
import {Connection, PublicKey, clusterApiUrl} from '@solana/web3.js'
import { SignedMessage } from '../../../src/models/SignedMessage';
import nacl from 'tweetnacl';
import base58 from 'bs58';

type Error = {
  error: string | unknown  
}
type ReqData = {
  user: User,
  signedMessage: {
    signature: any,
    provider: string,
    publicKey: string
  },
}
export const config = {
  api: {
      bodyParser: {
          sizeLimit: '5mb' // Set desired value here
      }
  }
}
//Compress the user image downgrading the quality to 85% and converting the file to jpeg
async function CompressImage(imgBuffer:Buffer) {
  return sharp(imgBuffer).resize({width:500}).toFormat('jpeg').jpeg({quality: 85, force: true}).toBuffer()
}
function VerifySign (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array) {
  const verified = nacl.sign.detached.verify(message, signature, publicKey)
  return verified
}
function convertToUint8Array (provider: string, signature: any) {
  switch(provider) {
    case 'Solflare':
      return Uint8Array.from(Object.values(signature))
    case 'Phantom':
      return Uint8Array.from(signature.data)
    default:
      return Uint8Array.from(Object.values(signature))
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error | Object>
) {
  switch(req.method) {
    case 'POST':
    try{
      //message does not match the client side message this is for testing purposes only
      const message = new TextEncoder().encode('Please sign 2 this message to complete sign up');
      let data: ReqData = JSON.parse(req.body);
      let user: User = data.user
      let signedMessage = data.signedMessage
      let publicKey = new PublicKey(signedMessage.publicKey)
      //Convert signature passed from Client to Uint8Array and Verify the sign
      let signature: Uint8Array = convertToUint8Array(signedMessage.provider, signedMessage.signature);
      let verified = VerifySign(message, signature, publicKey.toBytes());
      if(!verified){
        throw 'Cannot verified the sign'
      }
      console.log(verified)
      let profilepic: string = user.profile_pic.split(';base64,').pop() || ''
      let imgBuffer: Buffer = Buffer.from(profilepic, 'base64');
      const client: MongoClient = await clientPromise
      const db: Db = client.db(process.env.MONGODB_DB)
      const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME ?? '')
      const verifyUserAviability: User = (await collection.findOne({"$or":[
        {"username": data.user.username},
        {"email": data.user.email}
      ]})) as User
      if (verifyUserAviability.username == data.user.username){
        throw 'Sorry the username is already in use'
      }
      if(verifyUserAviability.email == data.user.email) {
        throw 'Sorry the email is already in use'
      }
      const compressedImage: Buffer = await CompressImage(imgBuffer);
      const uploadFromBuffer = (image: Buffer) => {
        return new Promise<UploadApiResponse | UploadApiErrorResponse>((resolve, reject) => {
          let cloudinary_upload_stream = cloudinary.uploader.upload_stream(
            {
              folder: `MintMe/${user.username}`,
            },
            (error, result) => {
              if(result){
                resolve(result);
              }else{
                reject(error)
              }
            }
          );
          streamifier.createReadStream(image).pipe(cloudinary_upload_stream);
        });
      };
      let result= await uploadFromBuffer(compressedImage)
      .then((data) => {
        user = {...user, profile_pic: data.secure_url}
      }).catch((error) => {
        throw "Cannot Upload Image"
        
      })
      const addUser = await collection.insertOne(user)
      .then((result) => res.status(200).json('Success Signup'))
      .catch((error) => {
        throw "Cannot signup user to database"
        
      })
    }catch (error: any){
      console.log(error)
      res.status(400).send(error)
    }      
      break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
