import React from 'react'
import useSWR, {Key, Fetcher} from 'swr'
import { User } from '../../models/User'
type Props = {}

function useUser() {
    const uid: Key = '/api/users/user_account'
    const fetcher: Fetcher<User, string> = (id) => fetch(id).then(r => r.json());
    const {data, isLoading, error} = useSWR(uid, fetcher);
    return {data, isLoading, error}
}

export default useUser