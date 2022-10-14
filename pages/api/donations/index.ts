import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../src/services/database.service';
import {MongoClient, Db, Collection} from 'mongodb'
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
        try {
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(DONATION_COLLECTION_NAME ?? '')
            const donations: Donation[] = (await collection.find({}).toArray()) as Donation[]
            res.status(200).json(donations)
        } catch (error) {
            res.status(400).json({error})
        }
        break;
    case 'POST':
        try {
            res.status(200).json([])
        } catch (error) {
            res.status(400).json({error})
        }
        break;
    default:
        res.json({error: 'Sorry we cannot connect'})
  }
}