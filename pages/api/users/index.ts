import type { NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';

const {MONGODB_DB, DONATION_COLLECTION_NAME, USER_COLLECTION_NAME} = process.env;
type Error = {
  error: string | unknown  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | Error>
) {
  switch(req.method) {
    case 'GET':
        try{
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(USER_COLLECTION_NAME ?? '')
            const users: User[] = (await collection.find({}).toArray()) as User[]
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json({error})
        }

        break;
    case 'POST':
        try{
            const user: User = JSON.parse(req.body)
            console.log(user.email)
            res.status(200).json([])
        } catch (error){
            res.status(400).json({error})
        }
        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
