import React from 'react'
import useSWR, {Key, Fetcher} from 'swr'
import { User } from '../../models/User'
type Props = {}

function useUser() {

    const uid: Key = '/api/users/user_account'
    const fetcher: Fetcher<User, string> = async (id) =>{
     const res = await fetch(id) 
     if(!res.ok){
        const error = new Error('An error occurred while fetching the data.')
        throw error
     }
     return res.json()
    };
    const {data, isLoading, error, mutate} = useSWR(uid, fetcher);
    return {data, isLoading, error, mutate}
}

export default useUser