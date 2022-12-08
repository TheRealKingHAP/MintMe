import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


export default async function LogOutHandler (
    req: NextApiRequest,
    res: NextApiResponse
){
    switch(req.method){
        case 'DELETE':
            try {
                const {cookies} = req
                const jwt = cookies.MintMeJWT;
                if(!jwt){
                    throw 'You are already not logged in'
                }else{
                    const serialized = serialize('MintMeJWT', '', {
                        httpOnly: true,
                        sameSite: 'strict',
                        path: '/',
                    })
                    res.setHeader("Set-Cookie", serialized);
                    res.status(200).json({message: 'Successfuly logged out'})
                }
            } catch (error: any) {
                return res.status(401).send({error:{message:error.message}})
            }
            break;
        default:
            res.status(400).send({error:{message: 'Sorry there was an error'}})
    }
}