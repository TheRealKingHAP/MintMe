import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import AccountPageLayout from '../../components/layouts/AccountPageLayout'
import NavigationMenu from '../../components/myAccount/NavigationMenu/NavigationMenu'
import PersonalInfo from '../../components/myAccount/PersonalInfo'
import { User } from '../../src/models/User'
import useSWR, {Key, Fetcher} from 'swr'
import useUser from '../../src/hooks/my_account/useUser'

type Props = {}

function Profile({}: Props) {
    const {wallet, signMessage, publicKey} = useWallet()
    const {data, error, isLoading} = useUser()

    const handleDataChanges = async (value: User) => {
        
        console.log(value)
    }
    if(isLoading){
        return(
            <div className='w-full h-[calc(100vh-96px)]  flex items-center justify-center'>
                <CgSpinner  className='text-violet-500 w-10 h-10 animate-spin'/>
            </div>
        )
    }
    return (
        <AccountPageLayout selectedOptionMenu={1}>
            <div className='w-full bg-white dark:bg-dark-mode-background-background'>
                {data ?
                    <div className='py-5 flex flex-col items-center text-gray-700 dark:text-white'>
                        <PersonalInfo user={data} callback={(value: User) => handleDataChanges(value)} />    
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

export default Profile