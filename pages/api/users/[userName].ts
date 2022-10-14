import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
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
  res: NextApiResponse<User | Error>
) {
  switch(req.method) {
    case 'GET':
        try{
            const {userName} = req.query;
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(USER_COLLECTION_NAME ?? '')
            const user: User = (await collection.findOne({"first_name": `${userName}`})) as User
            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({error})
        }

        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
