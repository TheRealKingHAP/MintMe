import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../src/lib/api/web3auth";




export default async function GetUniqueMessageHandler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch(req.method){
        case 'GET':
            //Generate unique message to sign and send it to front end
            const {cookies} = req;
            const jwt = cookies.MintMeJWT;
            if(jwt && validateToken({token: jwt}).status){
                return res.status(200).send({message: 'skip'})
            }
            const message = getRandomMessage(58)
            res.status(200).json({message: message})
            break;
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