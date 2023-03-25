import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react'
import { CgSpinner } from 'react-icons/cg'
import AccountPageLayout from '../../components/layouts/AccountPageLayout'
import DataChart from '../../components/myAccount/DataChart'
import DonationBlock from '../../components/users/userPage/donations/DonationBlock'
import Fee_Collector from '../../constants/fee_collector'
import useUser from '../../src/hooks/my_account/useUser'
import { Donation } from '../../src/models/Donation'
import useSWR from 'swr';
import useDonations from '../../src/hooks/my_account/useDonations'
import Link from 'next/link'
import SkeletonDonationBlock from '../../components/skeletons/userpage/SkeletonDonationBlock'

type Props = {

}

function Overview({}: Props) {
    const {wallet, signMessage, publicKey} = useWallet()
    const {data, isLoading, error} = useUser()
    const router = useRouter();
    const donations = useDonations(data?._id?.toString() || '');
    console.log(donations.data)
    if(isLoading || donations.isLoading){
        return(
            <div className='w-full h-[calc(100vh-96px)]  flex items-center justify-center'>
                <CgSpinner  className='text-violet-500 w-10 h-10 animate-spin'/>
            </div>
        )
    }
    if(!publicKey && !isLoading){
        router.push('/')
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
                        <section className='w-3/4 landscape:2xl:w-1/3'>
                            {donations.data ? 
                                <DonationBlock title='Donations' donations={donations.data} />
                                :
                                <SkeletonDonationBlock />
                            }
                        </section>
                        
                    </div>
                :
                <div className='py-5 flex flex-col h-[calc(100vh-96px)]  justify-center items-center space-y-12 text-gray-700 dark:text-white'>
                    <h3 className='text-gray-800 font-semibold text-lg dark:text-white'>Please create an account first</h3>
                    <Link href={'/signup'}><a className='p-2 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-semibold'>Create my page</a></Link>
                </div>
                }
                {error ?
                    <div className='py-5 flex flex-col h-[calc(100vh-96px)]  justify-center items-center space-y-12 text-gray-700 dark:text-white'>
                        <h3 className='text-gray-800 font-semibold text-lg dark:text-white'>{error.message}</h3>
                    </div>
                :
                null
                }
            </div>
        </AccountPageLayout>
    )
}

export default Overview