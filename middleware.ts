import { PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import nacl from "tweetnacl";



export function middleware(req: NextRequest){
    console.log('Hi from middleware')
    const {cookies} = req
    const jwt = cookies.get('MintMeJWT');
    const url = req.url
    if(!jwt) {
        return NextResponse.redirect('http:localhost:3000/')
    }
    if(url.includes('/user/my_account')){
        try {
            const [publicKey, message, signature] = jwt.split('.')
            const content = JSON.parse(new TextDecoder().decode(base58.decode(message))) as {
            action: string,
            exp: number
            };
            const hasValidSign = nacl.sign.detached.verify(
            base58.decode(message),
            base58.decode(signature),
            new PublicKey(publicKey).toBytes()
            );
            console.log({
            hasValidSign, message: 'from Middleware'
            });
            if(!hasValidSign){
                throw 'Sorry not a valid sign'
            }
            if(Date.now() > content.exp) {
                throw 'Sorry token expired'
            }
            return NextResponse.next()    
        } catch (error) {
            return NextResponse.redirect('http:localhost:3000/')
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/user/my_account',
}