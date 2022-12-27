import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import AccountPageLayout from '../../components/layouts/AccountPageLayout'
import NavigationMenu from '../../components/myAccount/NavigationMenu/NavigationMenu'
import PersonalInfo from '../../components/myAccount/PersonalInfo'
import { User } from '../../src/models/User'

type Props = {}

function Profile({}: Props) {
    const [loadingData, setLoadingData] = useState(false)
    const {wallet, signMessage, publicKey} = useWallet()
    const [data, setData] = useState<User>()
    const [error, setError] = useState<string>();
    const getData = async () => {
        setLoadingData(true)
        const res = await fetch('http://localhost:3000/api/users/user_account')
        const result = await res.json()
        if(!res.ok || !result){
            setError('Sorry there was an error')
            setLoadingData(false);            
            return
        }
        setData(result);
        setLoadingData(false)
        return
    }
    useEffect(() => {
      getData()
    }, [])
    const handleDataChanges = async (value: User) => {
        /*const updatedData: User = value
        setData(updatedData)*/
        console.log(value)
    }
    if(loadingData){
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