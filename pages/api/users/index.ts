import type { NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';

type Error = {
  error: string | unknown  
}
type Query = {
  topusers?: boolean | string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | Error | string>
) {
  switch(req.method) {
    case 'GET':
        try{
          const query: Query = req.query
          const client: MongoClient = await clientPromise
          if(query.topusers == 'true'){
            const data = await getTopUsers(client, 5)
            .then((value) => {
              res.status(200).json(value);
            }).catch((error) => {
              throw 'Cannot find information'
            })
          }
          else{
            const db: Db = client.db(process.env.MONGODB_DB)
            const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME ?? '')
            const users: User[] = (await collection.find({}).toArray()) as User[]
            res.status(200).json(users) 
          }
        } catch (error) {
            res.status(400).json({error})
        }
        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}

async function getTopUsers(client: MongoClient, limit: number){
  const db: Db = client.db(process.env.MONGODB_DB)
  const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME || '')
  const users: User[] = (await collection.find({}).limit(limit).toArray()) as User[] || []
  return users
}