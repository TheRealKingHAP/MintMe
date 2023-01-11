import {ConfirmedSignatureInfo, Connection, ParsedInstruction, ParsedTransactionWithMeta, PublicKey} from '@solana/web3.js';
import { SolanaParsedInstruction } from '../../models/SolanaParsedInstruction';

type GetTransactions = {
    connection: Connection,
    toPublicKey: PublicKey,
    options: {
        before?: string,
        limit: number
    },
    fromPublicKey?: PublicKey,
}
export default async function getTransactions ({
    connection,
    options,
    toPublicKey,
    fromPublicKey
}: GetTransactions
) {
    const transactionList = await connection.getSignaturesForAddress(toPublicKey, {
        before: options.before,
        limit: options.limit
    })
    let signatureList = transactionList.map((transaction: ConfirmedSignatureInfo) => transaction.signature)
    let transactionDetails = await connection.getParsedTransactions(signatureList);
    if(fromPublicKey){
        let filteredTxList = transactionDetails.filter((tx) => {
            if(!tx){
                return null
            }
            let parsedInstruction: ParsedInstruction = tx.transaction.message.instructions[0] as ParsedInstruction
            let txInfo: SolanaParsedInstruction = parsedInstruction.parsed
            return (txInfo.info.source === fromPublicKey.toBase58())
        })
        let result: SolanaParsedInstruction[] = []
        filteredTxList.map((filteredTx) => {
            let parsedInstruction: ParsedInstruction = filteredTx?.transaction.message.instructions[0] as ParsedInstruction
            let filteredTxInfo: SolanaParsedInstruction = parsedInstruction.parsed;
            result.push(filteredTxInfo);
        })
        console.log(filteredTxList);
        return result 
    }
    return transactionDetails
}