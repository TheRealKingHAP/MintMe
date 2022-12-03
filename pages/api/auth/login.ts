import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import nacl from "tweetnacl";
import base58 from "bs58";
import { PublicKey } from "@solana/web3.js";

export default async function LogInHandler(
    req: NextApiRequest,
    res: NextApiResponse
){
    switch (req.method) {
        case 'POST':
            try{
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
                if(!hasValidSign){
                    throw 'Signature not valid'
                }
                const content = JSON.parse(new TextDecoder().decode(base58.decode(message))) as {
                    action: string,
                    exp: number
                  };
                if(Date.now() > content.exp) {
                    throw 'Token expired'
                }
                const serialized = serialize('MintMeJWT', authKey, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: content.exp,
                    path: '/'
                })
                res.setHeader('Set-Cookie', serialized);
                res.status(200).json({message: 'Success login'})
            }catch(error: any){
                return res.status(401).send({error:{message: error.message}})
            }
            break;
        default:
            return res.status(400).json({error: {message: 'Sorry there was an error'}})
    }
} 