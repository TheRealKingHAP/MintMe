import React, {useState} from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletDisconnectButton, WalletIcon, WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import NavBarElement from './NavBarElement';
import { BsPersonCircle, BsSearch } from 'react-icons/bs';
import {HiMenu, HiOutlineX} from 'react-icons/hi';
import {FaDonate} from 'react-icons/fa';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';

function NavBar() {
    const router = useRouter();
    const {wallet} = useWallet();
    const {setVisible} = useWalletModal();
    const [isActive, setIsActive] = useState(false)
    const onRequestConnectWallet = () => {
      setVisible(true);
    }
    //Redirect to main page if the wallet is already connected
    const redirectProfile = () => {
      router.push('/');
    }
  return (
    <div className={`${ isActive ? 'max-h-72' : 'max-h-20'}  bg-white flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-5 lg:space-y-0 px-5 py-5 lg:p-12 w-full lg:h-[72px]  shadow-sm transition-all transform ease-in-out duration-300`}>
        <div className='flex justify-between items-center'>
        <Link href={'/'}>
          <a className='font-bold text-2xl text-gray-700 flex items-center space-x-2'>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative h-12 w-12'>
              <Image src={'/mintMeMain.svg'} alt={'Logo'} layout='fill' objectFit='contain' />
            </div>
            <span>MintMe</span>
          </a>
        </Link>
        <HiMenu className={` ${isActive ? 'hidden' : 'block'} lg:hidden h-7 w-7 text-gray-700`} onClick={() => {setIsActive(true)}} />
        <HiOutlineX className={` ${!isActive ? 'hidden' : 'block'} lg:hidden h-7 w-7 text-gray-700`} onClick={() => {setIsActive(false)}}/>
        </div>
        <ul className={'overflow-hidden lg:overflow-visible lg:w-1/2 flex flex-col lg:flex-row lg:items-center lg:justify-end space-y-2 lg:space-y-0 lg:space-x-16 text-base font-bold text-gray-600'}>
          <Link href={'/explore'}><a className='active:p-1 lg:active:p-0 hover:text-gray-900 active:bg-gray-100 active:py-2 lg:active:bg-transparent lg:active:py-0 transition-all ease-in-out duration-100'><li>Explore</li></a></Link>
          <Link href={'/donate'}><a className='active:p-1 lg:active:p-0 hover:text-gray-900 active:bg-gray-100 active:py-2 lg:active:bg-transparent lg:active:py-0 transition-all ease-in-out duration-100'><li>Donate</li></a></Link>
          {!wallet?.adapter.connected ? 
          <li><NavBarElement label='Log in' onClickFunction={!wallet ? onRequestConnectWallet : redirectProfile}/></li>
          :
          <li>
            <WalletMultiButton />
          </li>
          }
          {!wallet?.adapter.connected && <Link href={'/signup'}><a className='bg-violet-500 rounded-3xl w-24 text-center p-2 text-white font-semibold'><li>Sign up</li></a></Link>}
        </ul>
    </div>
  )
}

export default NavBar