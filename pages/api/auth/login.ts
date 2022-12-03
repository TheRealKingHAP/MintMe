import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import nacl from "tweetnacl";
import base58 from "bs58";
import { PublicKey } from "@solana/web3.js";
import { validateToken } from "../../../src/lib/api/web3auth";

export default async function LogInHandler(
    req: NextApiRequest,
    res: NextApiResponse
){
    switch (req.method) {
        case 'POST':
            const {cookies} = req;
            const jwt = cookies.MintMeJWT;
            if(jwt){
                if(validateToken({token: jwt}).status){
                    return res.status(200).json({message: 'You are already loged in'})
                }
            }
            try{
                const authHeader = req.headers.authorization
                if(!authHeader) {
                  return res.status(401).send({error: {message: 'Missing authorization header'}})
                }
                const [, authKey] = authHeader.split(' ')
                const isTokenValid = validateToken({
                    token: authKey,
                    returnData: "Expiration-Time"
                })
                const serialized = serialize('MintMeJWT', authKey, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: isTokenValid.expirationTime,
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