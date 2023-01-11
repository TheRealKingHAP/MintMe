import { NextApiRequest, NextApiResponse } from "next";
import {Connection,clusterApiUrl ,sendAndConfirmTransaction, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair, RpcResponseAndContext, SignatureResult, PublicKey} from '@solana/web3.js'
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../../src/services/database.service";

type DonationDbSchema = {
    signature: string,
    receiver: ObjectId | string
}
export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
){
    switch(req.method){
        case 'POST':
            try {
                //Server-side
                const TxData = JSON.parse(req.body);
                const {receiver, signature}: DonationDbSchema = TxData;
                //Get Tx1 data from client
                const client: MongoClient = await clientPromise;
                const db: Db = client.db(process.env.MONGODB_DB);
                const collection: Collection = db.collection(process.env.DONATION_COLLECTION_NAME ?? '');
                const donation: DonationDbSchema = {
                    receiver: new ObjectId(receiver),
                    signature: signature
                }
                await collection.insertOne(donation).then((value) => {
                    res.status(200).json('Donation complete')
                })

                break;
            } catch (error) {
                res.status(404).json(error)
            }
        default:
            res.status(404).json({error: 'Sorry there was an error'})
            break;
    }
}