import { NextApiRequest, NextApiResponse } from "next";
import {Connection,clusterApiUrl ,sendAndConfirmTransaction, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair, RpcResponseAndContext, SignatureResult, PublicKey} from '@solana/web3.js'
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../../src/services/database.service";

type DonationDbSchema = {
    signature: string,
    receiver: ObjectId
}
type ReqTransaction = {
    amount: number,
    id: string,
    receiverPublicKey: string,
    donator: string
}
export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
){
    switch(req.method){
        case 'POST':
            try {
                //Server-side
                const Tx1 = JSON.parse(req.body);
                
                //Get transaction data from client
                const {amount, receiverPublicKey, id, donator}: ReqTransaction  = Tx1;

                //Calculations 
                const fee = amount * 0.02;
                const total_donation = amount - fee;
                const connection: Connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
                const latestBlockHash = await connection.getLatestBlockhash();

                //Generate the keypair for the fee collector account
                const feeCollector = Keypair.fromSecretKey(
                    Uint8Array.from(JSON.parse(process.env.FEE_COLLECTOR || ''))
                );

                //Create the transaction with 2 instructions
                const tx: Transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: new PublicKey(donator),
                        toPubkey: feeCollector.publicKey,
                        lamports: amount
                    }),
                    SystemProgram.transfer({
                        fromPubkey: feeCollector.publicKey,
                        toPubkey: new PublicKey(receiverPublicKey),
                        lamports: total_donation
                    })
                );

                //Set the fee payer to be the wallet from user logged in 
                tx.feePayer = new PublicKey(donator)
                const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash();
                tx.recentBlockhash = blockhash;
                tx.lastValidBlockHeight = lastValidBlockHeight;

                //Partial sign the Tx with the keypair from Fee Collector
                tx.partialSign(feeCollector);
                const wireTransactionToSendBack = tx.serialize({requireAllSignatures: false});

                //Send the transaction back to client to be signed
                res.status(200).json(wireTransactionToSendBack)    
            } catch (error: any) {
                console.log(error.message)
                res.status(404).json(error)
            }
            break;
        default:
            res.status(404).json({error: 'Sorry there was an error'})
            break;
    }
}