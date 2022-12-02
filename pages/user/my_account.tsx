import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'

type Props = {

}

function MyAccount({}: Props) {
    const {wallet, signMessage, publicKey} = useWallet()
    const router = useRouter()
    const getData = async () => {
        await fetch('http://localhost:3000/api/users/user_account',
        {
            method: 'POST',
            body: JSON.stringify({pubKey: publicKey})
        }
        )
        .then((res) => {
            res.json()
        })
        .then((data) => console.log(data))
    }
    useEffect(() => {
      if(!wallet){
        router.push('/')
      }
      getData()
    }, [wallet])

    return (
        <div className=''>
            <p>{publicKey?.toBase58()}</p>
        </div>
    )
}

export default MyAccount