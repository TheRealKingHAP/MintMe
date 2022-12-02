import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import nacl from 'tweetnacl'
import base58 from 'bs58';
import { PublicKey } from '@solana/web3.js';
type Error = {
  error: string | unknown  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Error | string>
) {
  switch(req.method) {
    case 'GET':
        try{
          //const {pubKey} = JSON.parse(req.body);
          const authHeader = req.headers.authorization
          if(!authHeader) {
            return res.status(401).send({error: {message: 'Missing authorization header'}})
          }
          const [, authKey] = authHeader.split(' ')
          const [publicKey, message, signature] = authKey.split('.')
          const hasValidSign = nacl.sign.detached.verify(
            base58.decode(message),
            base58.decode(signature),
            new PublicKey(publicKey).toBytes()
          );
          console.log({
            hasValidSign
          });
          if(!hasValidSign){
            return res.status(401).send({error: {message: 'Invalid Signature'}})
          }
          const content = JSON.parse(new TextDecoder().decode(base58.decode(message))) as {
            action: string,
            exp: number
          };
          if(Date.now() > content.exp) {
            return res.status(401).send({error: {message: 'Expired signature'}})
          }

          /*const client: MongoClient = await clientPromise
          const db: Db = client.db(process.env.MONGODB_DB)
          const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME ?? '')
          const user: User = (await collection.findOne({"public.public_wallet": `${pubKey}`})) as User
          console.log(user);*/
          res.status(200).json('Success')
        } catch (error) {
            res.status(400).json({error})
        }

        break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
