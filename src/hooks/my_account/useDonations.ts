import { Fetcher, Key } from "swr";
import { Donation } from "../../models/Donation";
import useSWR from 'swr';

function useDonations(id: string, customUrl?: string){
    const uid: Key = customUrl ? `${customUrl}?userId=${id}` :`/api/donations/${id}`;
    const fetcher: Fetcher <Donation[], string> = async(id) => {
        const res = await fetch(id)
        if (!res.ok){
            const error = new Error('An error occurred while fetching the data.')
            throw error
        }
        return res.json()
    }
    const {data, error, isLoading, mutate} = useSWR(uid, fetcher, {onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
        if(retryCount >= 5) return
    }}); 
    return {data, error, isLoading, mutate}
}

export default useDonations