import { clusterApiUrl, Connection, ParsedInstruction, ParsedTransactionWithMeta } from "@solana/web3.js";
import { SolanaParsedInstruction } from "../../models/SolanaParsedInstruction";
import useSWR, { Fetcher, Key } from 'swr';
import { Donation } from "../../models/Donation";

export function MintMe() {
    async function getTransactionsFromSignatures(signatures: string []): Promise<SolanaParsedInstruction[]> {
        const connection: Connection = new Connection(clusterApiUrl('devnet'), 'finalized');
        const transactions: (ParsedTransactionWithMeta | null)[] = await connection.getParsedTransactions(signatures);
        let parsedInstructions: SolanaParsedInstruction[] = []
        transactions.map((tx) => {
            const date = new Date((tx?.blockTime as number) * 1000);
            let parsedInstruction: ParsedInstruction = tx?.transaction.message.instructions[1] as ParsedInstruction
            let filteredTxInfo: SolanaParsedInstruction = {
                ...parsedInstruction.parsed,
                date: date
            }
            parsedInstructions.push(filteredTxInfo);
        })
        
        return parsedInstructions 
    }
    function getUserDonations(id: string){
        const uid: Key = `/api/donations/${id}`;
        const fetcher: Fetcher <Donation[], string> = async(id) => {
            const res = await fetch(id)
            if (!res.ok){
                const error = new Error('An error occurred while fetching the data.')
                throw error
            }
            return res.json()
        }
        const {data, error, isLoading, mutate} = useSWR(uid, fetcher); 
        return {data, error, isLoading, mutate}
    }
    return {getTransactionsFromSignatures, getUserDonations}
}

