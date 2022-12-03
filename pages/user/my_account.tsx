import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'

type Props = {

}

function MyAccount({}: Props) {
    const {wallet, signMessage, publicKey} = useWallet()
    const [data, setData] = useState()
    const router = useRouter()
    const getData = async () => {
        const res = await (await fetch('http://localhost:3000/api/users/user_account')).json()
        setData(res);
        console.log(res)
    }
    useEffect(() => {
      getData()
    }, [])

    return (
        <div className=''>
            <p>{publicKey?.toBase58()}</p>
        </div>
    )
}

export default MyAccount