import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { CgSpinner } from 'react-icons/cg'
import DataChart from '../../components/myAccount/DataChart'
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
            {data ?
                <div className='py-5 flex flex-col items-center'>
                    <section className='flex flex-col items-center space-y-12'>
                        <h4 className='text-gray-700 dark:text-white font-bold text-2xl'>Hello, {data?.username}</h4>
                        <div className='relative h-24 w-24 rounded-full'>
                            <Image src={data.profile_pic}  layout='fill' objectFit='cover' className='rounded-full' />
                        </div>
                    </section>
                    <section id='Charts' className='grid grid-cols-2 gap-5 items-center justify-items-center mt-12'>
                        <DataChart qty={150} title='Total donations' description='(30 days)' className='' />
                        <DataChart qty={25} title='Top donation'/>
                    </section>
                </div>
            :
            null
            }
        </div>
    )
}

export default MyAccount