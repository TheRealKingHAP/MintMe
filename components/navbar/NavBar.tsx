import React, {useState, useEffect} from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletDisconnectButton, WalletIcon, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import NavBarElement from './NavBarElement';
import { BsPersonCircle, BsSearch } from 'react-icons/bs';
import {HiMenu, HiOutlineX} from 'react-icons/hi';
import {FaDonate} from 'react-icons/fa';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import ShortenString from '../../src/utils/ShortenString';
import {sign} from 'tweetnacl';
import { createAuthToken, reqAuth, reqLogOut } from '../../src/lib/api/web3auth';

interface Props {
  className?: string
}

function NavBar({className}: Props) {
  const router = useRouter();
  const {wallet, publicKey, signMessage, connected, disconnect} = useWallet();
  const {setVisible} = useWalletModal();
  const [isActive, setIsActive] = useState(false)
  const onRequestConnectWallet = () => {
    setVisible(true);
  }
  //Redirect to main page if the wallet is already connected
  const redirectProfile = () => {
    router.push('/');
  }
  const handleDisconnect = async () => {
    if(!wallet){
      throw new Error('There is no wallet connected');
    };
    const logOut = await reqLogOut({
      method: 'DELETE',
      wallet: {
        disconect: disconnect!
      }
    })
    console.log(logOut)
  }
  const handleSign = async () => {
    try {
      if(!publicKey) throw new Error('Wallet not connected')
      if(!signMessage) throw new Error('Wallet does not support message siging!')
      const signature = await reqAuth({
        action: 'skip',
        method: 'POST',
        wallet: {
          publicKey,
          signMessage: signMessage!
        }
      })
      console.log(signature)
      return {signature, publicKey}
    } catch (error: any) {
      handleDisconnect()
      
    }
  }
  useEffect(() => {
    if(connected){
      handleSign()
    }
  }, [connected])
  return (
    <div id='NavBar' className={`${ isActive ? 'max-h-72' : 'max-h-20'}  bg-white dark:bg-dark-mode-background-card-color text-gray-600 dark:text-white flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-5 lg:space-y-0 px-5 py-5 lg:p-12 w-full lg:h-[72px]  shadow-sm transition-all transform ease-in-out duration-300 z-20 relative ${className}`}>
        <div className='flex justify-between items-center'>
        <Link href={'/'}>
          <a className='font-bold text-2xl text-gray-700 dark:text-white flex items-center space-x-2'>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative h-12 w-12'>
              <Image src={'/mintMeMain.svg'} alt={'Logo'} layout='fill' objectFit='contain' />
            </div>
            <span>MintMe</span>
          </a>
        </Link>
        <HiMenu className={` ${isActive ? 'hidden' : 'block'} lg:hidden h-7 w-7 text-gray-700 dark:text-white`} onClick={() => {setIsActive(true)}} />
        <HiOutlineX className={` ${!isActive ? 'hidden' : 'block'} lg:hidden h-7 w-7 text-gray-700 dark:text-white`} onClick={() => {setIsActive(false)}}/>
        </div>
        <ul className={'overflow-hidden lg:overflow-visible lg:w-1/2 flex flex-col lg:flex-row lg:items-center lg:justify-end space-y-2 lg:space-y-0 lg:space-x-16 text-base font-bold '}>
          <Link href={'/explore'} legacyBehavior={true}><a className='active:p-1 lg:active:p-0 hover:text-gray-900 dark:hover:text-violet-500 active:bg-gray-100 active:py-2 lg:active:bg-transparent lg:active:py-0 transition-all ease-in-out duration-100'><li>Explore</li></a></Link>
          <Link href={'/donate'} legacyBehavior={true}><a className='active:p-1 lg:active:p-0 hover:text-gray-900 dark:hover:text-violet-500 active:bg-gray-100 active:py-2 lg:active:bg-transparent lg:active:py-0 transition-all ease-in-out duration-100'><li>Donate</li></a></Link>
          {wallet?.adapter.connected ? 
            <Link href={'/my_account/overview'} legacyBehavior={true}><a className='active:p-1 lg:active:p-0 hover:text-gray-900 dark:hover:text-violet-500 active:bg-gray-100 active:py-2 lg:active:bg-transparent lg:active:py-0 transition-all ease-in-out duration-100'><li>My account</li></a></Link>
            :
            null
          }
          {!wallet?.adapter.connected ? 
          <li><NavBarElement className={'hover:text-gray-900 dark:hover:text-violet-500 transition-all ease-in-out duration-100'} label='Log in' onClickFunction={!publicKey ? onRequestConnectWallet : redirectProfile}/></li>
          :
          <li className=''>
            <div className='flex space-x-5 items-center'>
              <p className='text-violet-500'>{ShortenString(wallet.adapter.publicKey?.toBase58(), 4)}</p>
              <button type='button' className='font-medium text-white bg-violet-500 rounded-xl p-2' onClick={handleDisconnect}>Disconnect</button>
            </div>
          </li>
          }
          {!wallet?.adapter.connected && <Link href={'/signup'} legacyBehavior={true}><a className='bg-violet-500 rounded-3xl w-24 text-center p-2 text-white font-semibold'><li>Sign up</li></a></Link>}
        </ul>
    </div>
  )
}

export default NavBar