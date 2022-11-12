import Image from 'next/image';
import React, { useState } from 'react'
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

type Props = {
  loadingCallBack: CallableFunction,
  finishedCallBack?: CallableFunction,
  createdUser?: string
}
function SignupBlock({loadingCallBack, finishedCallBack}: Props) {
  const {wallet} = useWallet()
  const {setVisible} = useWalletModal();
  const [formSelectIDX, setFormSelectIDX] = useState<number>(0);
  const [acceptedTC, setAcceptedTC] = useState<boolean>(false);
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
            <SignupSelectCountry value={data.country} handleChange={(value:Country) => setData({...data, country: value})} />
          </div>
        )
      case 1:
        return (
          <div id='Bio' className='space-y-12 flex flex-col mt-5 items-center w-full'>
            <SignupImageInput image={data.profile_pic} username={data.username} handleChange={(value: string) => setData({...data, profile_pic: value})} />
            <SignupInput title='Greetings!' inputType='text' inputValue={data.public.feed.bio.introduction} handleChange={(value: string) => setData(changeBioData('introduction', value))} />
            <SignupTextAreaInput title='About' inputValue={data.public.feed.bio.description} handleChange={(value: string) => setData(changeBioData('description', value))} className={'border-2 border-gray-300 rounded-3xl p-2 h-28 w-full focus:border-violet-400 outline-none resize-none'}/>
            <SignupSelectPlatform value={data.public.main_platform} handleChange={(value:Platform) => setData({...data, public:{...data.public, main_platform: value}})}/>
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
            {wallet?.adapter.connected ? <p className='font-medium text-gray-600 mb-5'>Connected wallet:</p> : null}
            <WalletMultiButton />
            {
              wallet?.adapter.connected ?
              <div id='termsandconditions' className='mt-16 text-sm text-gray-500 flex items-center space-x-2'>
                <p>I accept terms and conditions</p>
                <div className={`h-5 w-5 border-2 border-gray-300 rounded-md cursor-pointer ${acceptedTC ? 'bg-violet-500' : null}`} onClick={() => setAcceptedTC(!acceptedTC)}>
                  <BsCheck  className='w-full h-full text-white'/>
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
            <h3 className='text-center font-bold text-gray-800 text-2xl landscape:2xl:text-3xl'>Create an account</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400'>Let's get started, please enter the information required below</p>
          </div>
        )
      case 1:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 text-2xl landscape:2xl:text-3xl'>Let's finish your page</h3>
          </div>
        )
      case 2:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 text-2xl landscape:2xl:text-3xl'>Just one last step</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400'>Link your social media (optional)</p>
          </div>
        )
      case 3:
        return (
          <div className='w-full mt-12 landscape:2xl:mt-12 flex flex-col items-center'>
            <h3 className='text-center font-bold text-gray-800 text-2xl landscape:2xl:text-3xl'>Connect your wallet</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400'>This will be the wallet you want to recieve the payments and log in</p>
          </div>
        )
      default:
        return null
    }
  }
  const handleFormStepChange = (step: 'Next' | 'Back') => {
    if(step == 'Next'){
      setFormSelectIDX(formSelectIDX+1);
    }
    if(step == 'Back'){
      setFormSelectIDX(formSelectIDX-1);
    }
    return
  }
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    loadingCallBack(true)
    let user: User = {
      ...data, 
      public: {
        ...data.public, 
        public_wallet: wallet?.adapter.publicKey || ''
      }
    }
    if(acceptedTC){
      console.log(user)
      const res = await fetch('http://localhost:3000/api/users/addUser',
        {method: 'POST',
        body: JSON.stringify(user)
        }
      )
      loadingCallBack(false)
      if(finishedCallBack){
        finishedCallBack(true, data.username)
      }
    }
    return
  }
  return (
    <div className='bg-white flex flex-col space-y-16 pb-5 landscape:2xl:space-y-0 justify-between items-center h-full  w-full landscape:2xl:w-3/4'>
        <div className='w-3/4 mt-5'>
          <div onClick={formSelectIDX < 1 ? ()=>{} : () => handleFormStepChange('Back')} className={` w-max cursor-pointer flex items-center space-x-2 ${formSelectIDX < 1 ? 'hidden' : 'block'} `}>
            <BsArrowLeft className={` h-7 w-7  text-gray-600`}/>
            <p className='font-medium text-gray-600'>Back</p>
          </div>
        </div>
        {renderTitle(formSelectIDX)}
        <form onSubmit={handleSubmit} className={'flex flex-col items-center w-3/4 landscape:2xl:w-[24rem]'}>
          {
            renderSelectedForm(formSelectIDX)
          }
          {
          wallet?.adapter.connected ? 
            <button type={'submit'} className={`p-2 mt-24 w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-medium ${formSelectIDX === formsLength ? 'block' : 'hidden'} `}>{'Sign up'}</button>
          :
            null
          }
        </form>
        <button type={'button'} onClick={formSelectIDX == formsLength ? () => {} : () => handleFormStepChange('Next')} className={`p-2 mt-24  w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-medium ${formSelectIDX === formsLength ? 'hidden' : 'block'} `}>{'Next'}</button>        
    </div>
  )
}

export default SignupBlock