import type { NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection, ObjectId} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import sharp from 'sharp';
import streamifier from 'streamifier'

const {MONGODB_DB, DONATION_COLLECTION_NAME, USER_COLLECTION_NAME} = process.env;
type Error = {
  error: string | unknown  
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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  switch(req.method) {
    case 'POST':
        try{
            let user: User = JSON.parse(req.body)
            let profilepic: string = user.profile_pic.split(';base64,').pop() || ''
            let imgBuffer: Buffer = Buffer.from(profilepic, 'base64');
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(USER_COLLECTION_NAME ?? '') 
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
              throw new Error("Cannot Upload Image", error);
              
            })
            const addUser = await collection.insertOne(user)
            .then((result) => res.status(200).json('Success Signup'))
            .catch((error) => {
              throw new Error("Cannot signup user to database", error);
              
            })
        } catch (error){
            res.status(400).json({error})
        }
        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
