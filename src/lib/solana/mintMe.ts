import { clusterApiUrl, Connection, ParsedInstruction, ParsedTransactionWithMeta } from "@solana/web3.js";
import { SolanaParsedInstruction } from "../../models/SolanaParsedInstruction";
import useSWR, { Fetcher, Key } from 'swr';
import { Donation } from "../../models/Donation";

export function MintMe() {
    async function getTransactionsFromSignatures(signatures: string []): Promise<SolanaParsedInstruction[]> {
        const connection: Connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const transactions: (ParsedTransactionWithMeta | null)[] = await connection.getParsedTransactions(signatures);
        let parsedInstructions: SolanaParsedInstruction[] = []
        transactions.map((tx) => {
            if(!tx) return
            const date = new Date((tx?.blockTime as number) * 1000);
            let parsedInstruction1: ParsedInstruction = tx?.transaction.message.instructions[0] as ParsedInstruction
            let parsedInstruction2: ParsedInstruction = tx?.transaction.message.instructions[1] as ParsedInstruction
            let filteredTxInfo: SolanaParsedInstruction = {
                info: {
                    destination: parsedInstruction2.parsed.info.destination,
                    lamports: parsedInstruction2.parsed.info.lamports,
                    source: parsedInstruction1.parsed.info.source
                },
                type: parsedInstruction1.parsed.type,
                date: date
            }
            parsedInstructions.push(filteredTxInfo);
        })
        return parsedInstructions 
    }
    function GetUserDonations(id: string){
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
    return {getTransactionsFromSignatures, getUserDonations: GetUserDonations}
}

