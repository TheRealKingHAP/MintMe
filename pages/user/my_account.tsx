import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { CgSpinner } from 'react-icons/cg'
import { User } from '../../src/models/User'

type Props = {

}

function MyAccount({}: Props) {
    const [loadingData, setLoadingData] = useState(false)
    const {wallet, signMessage, publicKey} = useWallet()
    const [data, setData] = useState<User>()
    const router = useRouter()
    const getData = async () => {
        setLoadingData(true)
        const res = await (await fetch('http://localhost:3000/api/users/user_account')).json()
        setData(res);
        setLoadingData(false)
    }
    useEffect(() => {
      getData()
    }, [])
    if(loadingData){
        return(
            <div className='w-full h-screen landscape:2xl:h-[calc(100vh-96px)] flex items-center justify-center'>
                <CgSpinner  className='text-violet-500 w-10 h-10 animate-spin'/>
            </div>
        )
    }
    return (
        <div className='w-full  landscape:2xl:h-[calc(100vh-96px)]'>
            <div className=''>
                <h4 className='text-gray-700 dark:text-white font-bold text-2xl'>Hello! {data?.username}</h4>
            </div>
        </div>
    )
}

export default MyAccount