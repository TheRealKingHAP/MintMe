import { PublicKey } from '@solana/web3.js';
import base58 from 'bs58';
import { Router, useRouter } from 'next/router';


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
export const createAuthToken = async ({action, wallet}: AuthToken) => {
    const {message} = await (await fetch('http://localhost:3000/api/auth/get_message')).json()
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
    let authToken;
    authToken = await createAuthToken({
        action: action,
        wallet: wallet
    })
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