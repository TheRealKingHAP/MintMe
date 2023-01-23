import { PublicKey } from "@solana/web3.js"

export type SolanaParsedInstruction = {
    date: Date,
    info: {
        destination: string | PublicKey,
        lamports: number,
        source: string | PublicKey
    },
    type: string
}