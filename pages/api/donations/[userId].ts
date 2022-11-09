import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection, ObjectId} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import { Donation } from '../../../src/models/Donation';

const {MONGODB_DB, DONATION_COLLECTION_NAME, USER_COLLECTION_NAME} = process.env;
type Error = {
  error: string | unknown  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Donation[] | Error>
) {
  switch(req.method) {
    case 'GET':
        try{
            const {userId} = req.query;
            const mongoId = new ObjectId(userId?.toString())
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(DONATION_COLLECTION_NAME ?? '')
            const donations: Donation[] = (await collection.find({"receiver.id": mongoId}).sort({"amount": -1}).limit(10).toArray()) as Donation[]
            res.status(200).json(donations)
        } catch (error) {
            res.status(400).json({error})
        }

        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
