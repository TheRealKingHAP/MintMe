import { Fetcher, Key } from "swr";
import { Donation } from "../../models/Donation";
import useSWR from 'swr';

function useDonations(id: string){
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

export default useDonations