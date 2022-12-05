import { PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import nacl from "tweetnacl";
import { validateToken } from "./src/lib/api/web3auth";



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
            const isValid = validateToken({token: jwt})
            if(!isValid.status)
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