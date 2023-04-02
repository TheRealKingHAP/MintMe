import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import {MongoClient, Db, Collection, ObjectId} from 'mongodb'
import { ErrorInfo } from 'react';
import { User } from '../../../src/models/User';
import clientPromise from '../../../src/services/database.service';
import { Donation } from '../../../src/models/Donation';
import { DonationDbSchema } from '../../../src/models/DonationDbSchema';
import { SolanaParsedInstruction } from '../../../src/models/SolanaParsedInstruction';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { MintMe } from '../../../src/lib/solana/mintMe';
import { validateToken } from '../../../src/lib/api/web3auth';

const {MONGODB_DB, DONATION_COLLECTION_NAME, USER_COLLECTION_NAME} = process.env;
type Error = {
  error: string | unknown  
}
type DonationRequest = {
  userId: string,
  option?: 'TOP' | 'ALL'
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Donation[] | Error>
) {
  switch(req.method) {
    case 'GET':
        try{
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
            const {userId}: DonationRequest = req.query as DonationRequest;
            const mongoId = new ObjectId(userId)
            const client: MongoClient = await clientPromise
            const db: Db = client.db(MONGODB_DB)
            const collection: Collection = db.collection(DONATION_COLLECTION_NAME ?? '')
            const donationsSchema: DonationDbSchema[] = (await collection.find({"receiver": mongoId}).sort({"amount": -1}).limit(10).toArray()) as DonationDbSchema[]
            let signatures: string[] = []
            donationsSchema.map((donation) => {
                signatures.push(donation.signature)
            })
            let parsedDonations = await MintMe().getTransactionsFromSignatures(signatures);
            let donations: Donation[] = []
            parsedDonations.map((data) => {
                donations.push({
                amount: data.info.lamports / LAMPORTS_PER_SOL,
                //Convert Date Object to Month/Day/Year
                date: `${data.date.getUTCMonth()+1}/${data.date.getUTCDate()}/${data.date.getFullYear()}`,
                message: '',
                sender: data.info.source.toString(),
                receiver: {
                    id: {$oid: ''},
                    address: data.info.destination.toString()
                }
                })
            })
            res.status(200).json(donations)
            } catch (error: any) {
                res.status(400).json(error.message)
            }

            break;
    default:
        res.status(400).send({error: 'Sorry there was an error'});
  }
}
