import type { NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection, ObjectId} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import { v2 as cloudinary } from 'cloudinary'


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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Error>
) {
  switch(req.method) {
    case 'POST':
        try{
            let user: User = JSON.parse(req.body)
            let profilepic: string = ''
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(USER_COLLECTION_NAME ?? '') 
            const uploadImage = await cloudinary.uploader.upload(
                user.profile_pic, 
                {
                    folder: `MintMe/${user.username}`,
                    format: 'jpg',
                    transformation: {width: 200}
                }
            )
            .then(
              (response) => {
                user = {...user, profile_pic: response.secure_url}
              }
            ).catch((error) => console.log(error))
            const addUser = await collection.insertOne(user)
            .then((result) => res.status(200).json('Success Signup'))
            console.log('Success SignUp')
        } catch (error){
            res.status(400).json({error})
        }
        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
