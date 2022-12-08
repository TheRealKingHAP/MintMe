import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import nacl from 'tweetnacl'
import base58 from 'bs58';
import { PublicKey } from '@solana/web3.js';
import { validateToken } from '../../../src/lib/api/web3auth';
type Error = {
  error: string | unknown  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Error | string | object>
) {
  switch(req.method) {
    case 'GET':
        try{
          //const {pubKey} = JSON.parse(req.body);
          //const authHeader = req.headers.authorization;
          const {cookies} = req;
          const jwt = cookies.MintMeJWT;
          if(!jwt) {
            return res.status(401).send({error: {message: 'Missing authorization header'}})
          }
          const [publicKey, message, signature] = jwt.split('.')
          const isTokenValid = validateToken({token: jwt})
          if(!isTokenValid.status){
            throw `Sorry there was a problem with the authentication`
          }
          const client: MongoClient = await clientPromise
          const db: Db = client.db(process.env.MONGODB_DB)
          const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME ?? '')
          const user: User = (await collection.findOne({"public.public_wallet": `${publicKey}`})) as User
          res.status(200).json(user)
        } catch (error) {
            res.status(400).json({error})
        }

        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
