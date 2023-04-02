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
import { validateToken } from '../../../src/lib/api/web3auth';

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
          sizeLimit: '50mb' // Set desired value here
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
const uploadFromBuffer = (image: Buffer, path: string) => {
    return new Promise<UploadApiResponse | UploadApiErrorResponse>((resolve, reject) => {
      let cloudinary_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: path,
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
const deleteImageFromCloud = async (public_id: string) => {
  let result = await cloudinary.uploader.destroy(public_id, (error, res) => {
    if(res){
      console.log(res)
    }else{
      console.log(error)
    }
  })
  return result
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error | Object>
) {
  switch(req.method) {
    case 'POST':
    try{
      //message does not match the client side message this is for testing purposes only
      const message = new TextEncoder().encode('Please sign this message to complete sign up');
      const jwt = req.cookies.MintMeJWT
      if(!jwt){
        throw 'Sorry there was an error with sign authentication'
      }
      const isSessionValid = validateToken({
        token: jwt
      })
      if(!isSessionValid.status){
        throw 'Sorry cannot verify the sign'
      }
      let data: ReqData = JSON.parse(req.body);
      let user: User = data.user
      let id = new ObjectId(user._id);
      let signedMessage = data.signedMessage
      let publicKey = new PublicKey(signedMessage.publicKey)
      //Convert signature passed from Client to Uint8Array and Verify the sign
      let signature: Uint8Array = convertToUint8Array(signedMessage.provider, signedMessage.signature);
      let verified = VerifySign(message, signature, publicKey.toBytes());
      if(!verified){
        throw 'Cannot verified the sign'
      }
      const client: MongoClient = await clientPromise
      const db: Db = client.db(process.env.MONGODB_DB)
      const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME ?? '')
      const prevData: User = (await collection.findOne({"_id": id})) as User

      //Only do mutation if the user change the images
      if(prevData.profile_pic != user.profile_pic){

        let profilepic: string = user.profile_pic.split(';base64,').pop() || '';
        let profilePicBuffer: Buffer = Buffer.from(profilepic, 'base64');
        const compressedProfileImage: Buffer = await CompressImage(profilePicBuffer);
        let result = await uploadFromBuffer(compressedProfileImage, `MintMe/${user.username}`)
        .then((data) => {
          user = {...user, profile_pic: data.secure_url}
        }).catch((error) => {
          throw "Cannot Upload Image"
          
        })
        const public_id = 'MintMe'+prevData.profile_pic.split(`MintMe`).pop()?.split('.').reverse().pop()
        let deletePrev = await deleteImageFromCloud(public_id || prevData.profile_pic)
      }
      if(prevData.public.banner_img != user.public.banner_img){
        let bannerImg: string = user.public.banner_img.split(';base64,').pop() || '';
        let bannerImgBuffer: Buffer = Buffer.from(bannerImg, 'base64');
        const compressedBannerImg: Buffer = await CompressImage(bannerImgBuffer);
        let result = await uploadFromBuffer(compressedBannerImg, `MintMe/${user.username}`)
        .then((data) => {
          user = {...user, public:{...user.public, banner_img: data.secure_url}}
        }).catch((error) => {
          throw "Cannot Upload Image"
          
        })
        const public_id = 'MintMe'+prevData.public.banner_img.split(`MintMe`).pop()?.split('.').reverse().pop()
        let deletePrev = await deleteImageFromCloud(public_id || prevData.public.banner_img)
      }
      
      const updateUser = await collection.updateOne({"_id": id}, {"$set": {
        "_id": id,
        "username": user.username,
        "email": user.email,
        "profile_pic": user.profile_pic,
        "country": user.country,
        "public": user.public
      }})
      .then((result) => res.status(200).json(user))
      .catch((error) => {
        throw 'Cannot update user'
      })
    }catch (error: any){
      console.log(error)
      res.status(400).send(error)
    }      
      break;
    default:
        res.status(400).send('Sorry there was an error');
  }
}
