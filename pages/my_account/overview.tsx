import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { CgSpinner } from 'react-icons/cg'
import AccountPageLayout from '../../components/layouts/AccountPageLayout'
import DataChart from '../../components/myAccount/DataChart'
import useUser from '../../src/hooks/my_account/useUser'
import { User } from '../../src/models/User'

type Props = {

}

function Overview({}: Props) {
    const {wallet, signMessage, publicKey} = useWallet()
    const {data, isLoading, error} = useUser()

    if(isLoading){
        return(
            <div className='w-full h-[calc(100vh-96px)]  flex items-center justify-center'>
                <CgSpinner  className='text-violet-500 w-10 h-10 animate-spin'/>
            </div>
        )
    }
    return (
        <AccountPageLayout selectedOptionMenu={0}>
            <div className='w-full bg-white dark:bg-dark-mode-background-background'>
                {data ?
                    <div className='py-5 flex flex-col items-center space-y-12 text-gray-700 dark:text-white'>
                        <section className='flex flex-col items-center space-y-12'>
                            <h4 className='font-bold text-2xl'>Hello, {data?.username}</h4>
                            <div className='relative h-36 w-36'>
                                <Image src={data.profile_pic} layout='fill' objectFit='cover' className='rounded-full' />
                            </div>
                        </section>
                        <section id='Charts' className='grid grid-cols-2 gap-5 items-center justify-items-center'>
                            <DataChart qty={150} title='Total donations' description='(30 days)' className='' />
                            <DataChart qty={25} title='Top donation'/>
                        </section>
                    </div>
                :
                null
                }
                {error ?
                    <div className='py-5 flex flex-col h-[calc(100vh-96px)]  justify-center items-center space-y-12 text-gray-700 dark:text-white'>
                        <h3 className='text-gray-800 font-semibold text-lg dark:text-white'>{error}</h3>
                    </div>
                :
                null
                }
            </div>
        </AccountPageLayout>
    )
}

export default Overview