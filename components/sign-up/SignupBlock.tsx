import Image from 'next/image';
import React, { useState, useEffect, FC } from 'react'
import { BsArrowLeft, BsCheck } from 'react-icons/bs'
import Platforms from '../../constants/platforms';
import SignupSelectCountry from './form/SignupSelectCountry';
import SignupSelectPlatform from './form/SignupSelectPlatform';
import SignupTextAreaInput from './form/SignupTextAreaInput';
import SignupImageInput from './form/SignupImageInput';
import SignupInput from './form/SignupInput'
import { SocialMedia } from '../../src/models/SocialMedia';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { User } from '../../src/models/User';
import { Platform } from '../../types/forms/PlatformType';
import { Country } from '../../types/forms/CountryType';
import {sign} from 'tweetnacl';
import validateUserData, { Validator } from '../../src/utils/Security/validateData';

type Props = {
  loadingCallBack: CallableFunction,
  finishedCallBack: CallableFunction,
  changeFormStep: CallableFunction
  createdUser?: string
  idx: number
}
function SignupBlock({loadingCallBack, finishedCallBack, idx, changeFormStep}: Props) {
  const {wallet, publicKey, signMessage} = useWallet()
  const {setVisible} = useWalletModal();
  const [formSelectIDX, setFormSelectIDX] = useState<number>(idx);
  const [acceptedTC, setAcceptedTC] = useState<boolean>(false);
  const [error, setError] = useState<Validator>({message: '', error: false});
  const [data, setData] = useState<User>({
    email: '',
    country: {name: '', code: ''},
    username: '',
    profile_pic: '',
    public: {
      banner_img: '',
      main_platform: {name: '', logo: '', base_url: ''},
      public_wallet: '',
      feed: {
        bio: {
          title: '',
          introduction: '',
          description: '',
          thumbnail: '',
        }
      },
      social_media: {
        facebook: '',
        instagram: '',
        tiktok: '',
        twitch: '',
        twitter: '',
        youtube: ''
      }
    }
  })
  const handleSign = async () =>{
    try {
      if(!publicKey) throw new Error('Wallet not connected')
      if(!signMessage) throw new Error('Wallet does not support message siging!')
      const req_message = await fetch('/api/auth/get_signup_message');
      if(!req_message.ok){
        throw Error('There was a problem requesting the message to sign')
      }
      const generated_message = await req_message.json() 
      const message = new TextEncoder().encode(generated_message.message);
      const signature = await signMessage(message);
      const provider = wallet?.adapter.name
      if(!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');
      return {signature, publicKey, provider, generated_message_id: generated_message.id}
    } catch (error: any) {
      return null
    }
  }
  const changeBioData = (key: 'title' | 'description' | 'thumbnail' | 'introduction',value: string) => {
    return {
      ...data,
      public: {
        ...data.public,
        feed: {
          bio: {
            ...data.public.feed.bio, 
            [key]: value
          }
        }
      }
    }
  }
  const platform = new Platforms()
  const onRequestConnectWallet = () => {
    setVisible(true);
  }
  const formsLength: number = 3;
  const renderSelectedForm = (IDX: number) => {
    switch (IDX) {
      case 0:
        return (
          <div id='PersonalInfo' className='space-y-12 mt-5 flex flex-col items-center w-full'>
            <SignupInput title='E-mail' inputType='email' inputValue={data.email} handleChange={(value: string) => setData({...data, email: value}) }/>
            <SignupInput title='Username' inputType='text' inputValue={data.username} handleChange={(value:string) => setData({...data, username: value})}/>
            <SignupTextAreaInput title='About' inputValue={data.public.feed.bio.description} handleChange={(value: string) => setData(changeBioData('description', value))} className={'border-2 border-gray-300 dark:bg-dark-mode-background-card-color dark:border-transparent dark:placeholder:text-gray-200 rounded-3xl p-2 h-28 w-full focus:border-violet-400 outline-none resize-none'}/>
            <SignupSelectCountry value={data.country} handleChange={(value:Country) => setData({...data, country: value})} />
          </div>
        )
      case 1:
        return (
          <div id='Bio' className='space-y-12 flex flex-col mt-5 items-center w-full'>
            <SignupImageInput image={data.profile_pic} username={data.username} handleChange={(value: string) => setData(prev => ({...prev, profile_pic: value}))} />
            <SignupInput title='Greetings!' inputType='text' inputValue={data.public.feed.bio.introduction} handleChange={(value: string) => setData(changeBioData('introduction', value))} />
            <SignupSelectPlatform value={data.public.main_platform} handleChange={(value:Platform) => setData({...data, public:{...data.public, main_platform: value}})}/>
            <div id='Banner' className='space-y-5 w-full'>
                    <p className='text-violet-400 '>Banner</p>
                    <SignupImageInput imgStyle='rounded-xl' image={data.public.banner_img} handleChange={(value: string) =>{ setData(prev => ({...prev, public:{...prev.public, banner_img: value}}))}} className='h-36 w-full'/>
            </div>
          </div>
        )
      case 2:
        return (
          <div id='SocialMedia' className='space-y-12 flex flex-col mt-5 items-center w-full'>
            {platform.platforms.map((platform, idx) => (
              <div className='flex items-center space-x-5' key={idx}>
                <Image src={platform.logo} height={42} width={42}/>
                <SignupInput title={platform.name} inputType='text' inputValue={data.public.social_media[platform.name.toLowerCase() as keyof SocialMedia]} handleChange={(value:string) => setData({...data, public:{...data.public, social_media:{...data.public.social_media, [platform.name.toLowerCase()]: value}}})} />
              </div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className='text-center landscape:2xl:mb-32'>
            {wallet?.adapter.connected ? <p className='font-medium text-gray-600 dark:text-gray-200 mb-5'>Connected wallet:</p> : null}
            <WalletMultiButton />
            {
              wallet?.adapter.connected ?
              <div id='termsandconditions' className='mt-16 text-sm text-gray-500 dark:text-gray-300 flex items-center space-x-2'>
                <p>I accept terms and conditions</p>
                <div className={`h-5 w-5 border-2 border-gray-300 rounded-md cursor-pointer ${acceptedTC ? 'bg-violet-500' : null}`} onClick={() => setAcceptedTC(!acceptedTC)}>
                  <BsCheck  className={`w-full h-full ${acceptedTC ? 'text-white' : 'text-transparent'}`}/>
                </div>
              </div>
              :
              null
            }
          </div>
        )
      default:
        return null
    }
  }
  const renderTitle = (IDX: number) => {
    switch(IDX){
      case 0:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 dark:text-white text-2xl landscape:2xl:text-3xl'>Create an account</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400 dark:text-gray-300'>Let&apos;s get started, please enter the information required below</p>
          </div>
        )
      case 1:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 dark:text-white text-2xl landscape:2xl:text-3xl'>Let&apos;s finish your page</h3>
          </div>
        )
      case 2:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 dark:text-white text-2xl landscape:2xl:text-3xl'>Just one last step</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400 dark:text-gray-300'>Link your social media (optional)</p>
          </div>
        )
      case 3:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 dark:text-white text-2xl landscape:2xl:text-3xl'>Connect your wallet</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400 dark:text-gray-300'>This will be the wallet you want to recieve the payments and log in</p>
          </div>
        )
      default:
        return null
    }
  }
  const handleFormStepChange = (step: 'Next' | 'Back') => {
    if(step == 'Next'){
      changeFormStep(idx+1)
    }
    if(step == 'Back'){
      changeFormStep(idx-1);
    }
    return
  }
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const isValid: Validator = validateUserData(data);
    if(isValid.error){
      setError((prev) => isValid);
      return
    }
    let signedMessage = await handleSign()
    if(!signedMessage){
      return
    }
    loadingCallBack(true)
    let user: User = {
      ...data, 
      public: {
        ...data.public, 
        public_wallet: wallet?.adapter.publicKey || ''
      }
    }
    if(acceptedTC && signedMessage){
      try {
        const res = await fetch('http://localhost:3000/api/users/addUser',
          {method: 'POST',
          body: JSON.stringify({user, signedMessage})
          }
        )
        loadingCallBack(false)
        if(!res.ok){
          let {error} = await res.json()
          throw Error(error)
        }
        if(res.ok){
          finishedCallBack(true, data.username, null, 'success')
        }  
      } catch (error: any) {
        finishedCallBack(true, data.username, error.message, null)
      }
    }
    return
  }
  return (
    <div className='bg-white dark:bg-dark-mode-background-background flex flex-col space-y-16 pb-5 landscape:2xl:space-y-0 justify-between items-center h-full  w-full landscape:2xl:w-3/4'>
        <div className='w-3/4 mt-5'>
          <div onClick={idx < 1 ? ()=>{} : () => handleFormStepChange('Back')} className={` w-max cursor-pointer flex items-center space-x-2 text-gray-600 dark:text-gray-200 ${idx < 1 ? 'hidden' : 'block'} `}>
            <BsArrowLeft className={` h-7 w-7 `}/>
            <p className='font-medium '>Back</p>
          </div>
        </div>
        {renderTitle(idx)}
        <form onSubmit={handleSubmit} className={'flex flex-col items-center w-3/4 landscape:2xl:w-[24rem]'}>
          {
            renderSelectedForm(idx)
          }
          <button disabled={wallet?.adapter.connected && acceptedTC ? false : true} type={'submit'} className={`p-2 mt-24 w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium ${idx === formsLength ? 'block' : 'hidden'} `}>{'Sign up'}</button>
        </form>
        {error.error && <p className='font-light text-violet-500 text-center w-3/4 landscape:2xl:w-max'>{error.message}</p>}
        <button type={'button'} onClick={idx == formsLength ? () => {} : () => handleFormStepChange('Next')} className={`p-2 mt-24  w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-medium ${idx === formsLength ? 'hidden' : 'block'} `}>{'Next'}</button>      
    </div>
  )
}

export default SignupBlock