import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import AccountPageLayout from '../../components/layouts/AccountPageLayout'
import NavigationMenu from '../../components/myAccount/NavigationMenu/NavigationMenu'
import PersonalInfo from '../../components/myAccount/PersonalInfo'
import { User } from '../../src/models/User'
import useSWR, {Key, Fetcher} from 'swr'
import useUser from '../../src/hooks/my_account/useUser'
import { useRouter } from 'next/router'
import {sign} from 'tweetnacl';
import SnackBar from '../../components/notifications/SnackBar'
import Link from 'next/link'
import Head from 'next/head'

type Props = {}
type SnackBar = {
    status: 'Error' | 'Success',
    message: string,
    isVisible: boolean
}
function Profile({}: Props) {
    const {wallet, signMessage, publicKey} = useWallet()
    const {data, error, isLoading, mutate} = useUser()
    const [updatingInfo, setUpdatingInfo] = useState<boolean>(false);
    const [snackBar, setSnackBar] = useState<SnackBar>({
        status: 'Error',
        message: '',
        isVisible: false
    })
    const router = useRouter();
    const handleSnackBar = (status: 'Error' | 'Success', message: string) => {
        setSnackBar({
            status: status,
            message: message,
            isVisible: true
        })
        setTimeout(() => {
            setSnackBar((prev) => ({...prev, isVisible: false}))
        }, 3000);
    }
    const handleSign = async () =>{
        try {
          if(!publicKey) throw new Error('Wallet not connected')
          if(!signMessage) throw new Error('Wallet does not support message siging!')
          const message = new TextEncoder().encode('Please sign this message to complete sign up');
          const signature = await signMessage(message);
          const provider = wallet?.adapter.name
          if(!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');
          return {signature, publicKey, provider}
        } catch (error: any) {
            console.log(error.message)
        }
    }
    const handleDataChanges = async (value: User) => {
        console.log({profile: value.profile_pic, banner: value.public.banner_img})
        setUpdatingInfo(true)
        try {
            let signedMessage = await handleSign()
            if(!signedMessage){
                throw Error('Sorry, please sign the message')
            }
            const update = await fetch(`${router.basePath}/api/users/updateUser`, {
                body: JSON.stringify({user: value, signedMessage}),
                method: 'POST'
            })
            if(!update.ok){
                let error = await update.text()
                throw Error(error)
            }
            if(update.ok){
                const updatedData = await update.json()
                mutate(updatedData)
                setUpdatingInfo(false)
            }
            handleSnackBar('Success', 'Changes updated successfully')
        } catch (error: any) {
            setUpdatingInfo(false)
            handleSnackBar('Error', error.message)
            console.log(error)
            return
        }
        return
    }
    if(isLoading){
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
        <AccountPageLayout selectedOptionMenu={1}>
            <Head>
                <title>{`Edit profile`}</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SnackBar isVisible={snackBar.isVisible} status={snackBar.status} message={snackBar.message}/>
            <div className='w-full bg-white dark:bg-dark-mode-background-background'>
                {data ?
                    <div className='py-5 flex flex-col items-center text-gray-700 dark:text-white'>
                        <PersonalInfo loading={updatingInfo} user={data} callback={(value: User) => handleDataChanges(value)} />    
                    </div>
                :
                <div className='py-5 flex flex-col h-[calc(100vh-96px)]  justify-center items-center space-y-12 text-gray-700 dark:text-white'>
                    <h3 className='text-gray-800 font-semibold text-lg dark:text-white'>Please create an account first</h3>
                    <Link href={'/signup'}><a className='p-2 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-semibold'>Create my page</a></Link>
                </div>
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