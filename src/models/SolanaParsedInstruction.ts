import { PublicKey } from "@solana/web3.js"

export type SolanaParsedInstruction = {
    info: {
        destination: string | PublicKey,
        lamports: number,
        source: string | PublicKey
    },
    type: string
}