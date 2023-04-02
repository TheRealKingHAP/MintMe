import { Collection, Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../src/lib/api/web3auth";
import clientPromise from "../../../src/services/database.service";




export default async function GetUniqueMessageHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch(req.method){
        case 'GET':
            try {
                //Generate unique message to sign and send it to front end
                const jwt = req.cookies.MintMeJWT
                if(!jwt){
                  throw 'Sorry there was an error with sign authentication'
                }
                const isSessionValid = validateToken({
                  token: jwt
                })
                if(!isSessionValid.status){
                  throw 'Sorry cannot verify the sign'
                }
                const message = getRandomMessage(58)
                const client: MongoClient = await clientPromise
                const db: Db = client.db(process.env.MONGODB_DB)
                const collection: Collection = db.collection(process.env.USER_COLLECTION_NAME ?? '')
                const saved_message = await collection.insertOne({message: message});
                if(!saved_message.insertedId){
                    throw Error('cannot generate message')
                }
                res.status(200).json({message: message, id: saved_message.insertedId})
                break;
                
            } catch (error: any) {
                return res.status(401).json({message: error.message})
            }
            
        default:
            res.status(400).send({error: 'Sorry, there was a problem with the server'})
    }

}

export function getRandomMessage(length: number) {
    var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}