import { PublicKey, PublicKeyInitData } from "@solana/web3.js"

export interface SignedMessage {
    signature: {
        type: string
        data: Iterable<number>
    }
    publicKey: PublicKeyInitData,
    provider: string
}