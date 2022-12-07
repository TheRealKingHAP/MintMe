import { PublicKey } from '@solana/web3.js';
import base58 from 'bs58';
import { Router, useRouter } from 'next/router';
import { NextRequest } from 'next/server';
import nacl from 'tweetnacl';


const baseUrl = 'http:localhost:3000'
type AuthToken = {
    action: string,
    wallet: MessageSigner,
}
type MessageSigner = {
    signMessage(message: Uint8Array) : Promise<Uint8Array>,
    publicKey: PublicKey
}
type RequestLogOut = {
    method: 'GET'|'POST'|'DELETE',
    wallet: WalletLogOut
}
type WalletLogOut = {
    disconect(): Promise<void>
}
type RequestAuth = {
    method: 'GET'|'POST'|'DELETE',
    wallet: MessageSigner,
    action: string
}
type TokenValidation = {
    token: string,
    returnData?: 'Expiration-Time' | 'PublicKey' | 'Message'
}
type ValidateTokenReturn = {
    status: boolean,
    expirationTime?: number,
    message?: string,
    publicKey?: string
}
export const createAuthToken = async ({action, wallet}: AuthToken) => {
    const res = await fetch('http://localhost:3000/api/auth/get_message')
    const {message} = await res.json()
    if(message == 'skip'){
        return null
    }
    const expirationDate = () => {
        let date = new Date()
        date.setDate(date.getDate() + 5);
        return date.getTime()
    }
    const encodedMessage = new TextEncoder().encode(JSON.stringify({
        action,
        message,
        exp: expirationDate()
    }))
    const signature = await wallet.signMessage(encodedMessage);
    const publicKey = wallet.publicKey.toBase58()
    const msg = base58.encode(encodedMessage);
    const sig = base58.encode(signature);
    const token = `${publicKey}.${msg}.${sig}`
    return token
}

export const reqAuth = async ({method, wallet, action} : RequestAuth) => {
    
    const authToken = await createAuthToken({
        action: action,
        wallet: wallet
    })
    if(action === 'skip' && !authToken){
        //try to use existing token
        return 'Session recover successfully'
    }   
    const response = (await fetch(`/api/auth/login`,
        {
            method: method,
            headers: {Authorization: `Bearer ${authToken}`},
        }
    )).json()
    
    return response
}
export const reqLogOut = async ({wallet, method}: RequestLogOut) => {
    const response = (await fetch('/api/auth/logout', {
        method: method
    })).json()
    await wallet.disconect()
    return response
}

export const validateToken = ({token, returnData}: TokenValidation) => {
    try {
        const [publicKey, message, signature] = token.split('.')
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
        if(!returnData){
            return {status: true} as ValidateTokenReturn
        }
        switch(returnData){
            case 'Expiration-Time':
                return {status: true, expirationTime: content.exp} as ValidateTokenReturn
                
            case 'Message':
                return {status: true, message} as ValidateTokenReturn
            
            case 'PublicKey':
                return {status: true, publicKey} as ValidateTokenReturn
            default:
                return {status: true} as ValidateTokenReturn
        }
    } catch (error) {
        return {status: false, error:{message: error}} as ValidateTokenReturn
    }
    
}