import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./src/lib/api/web3auth";
import {useWallet} from '@solana/wallet-adapter-react'


export function middleware(req: NextRequest){
    const {cookies} = req
    const jwt = cookies.get('MintMeJWT');
    const url = req.url
    if(!jwt) {
        return NextResponse.redirect('http:localhost:3000/')
    }
    /*if(url.includes('/my_account')){
        try {
            const connection = useWallet()
            console.log('Wallet', connection.publicKey)
            const isValid = validateToken({token: jwt, returnData: "Expiration-Time"})
            if(!isValid.status){
                throw 'Error'
            }
            
            return NextResponse.next()    
        } catch (error) {
            cookies.set('MintMeJWT', '', {
                httpOnly: true,
                sameSite: 'strict',
            })
            return NextResponse.redirect('http:localhost:3000/')
        }
    }*/
    return NextResponse.next()
}

export const config = {
    matcher: ['/my_account/:path*', '/api/users/user_account'],
}