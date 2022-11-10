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
  const [email, setEmail] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [greetings, setGreetings] = useState<string>('')
  const [profilePic, setProfilePic] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>();
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({facebook:'', instagram:'', twitch:'', twitter:'', youtube:'', tiktok: ''});
  const [formSelectIDX, setFormSelectIDX] = useState<number>(0);
  const [acceptedTC, setAcceptedTC] = useState<boolean>(false);
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
            <SignupInput title='E-mail' inputType='email' inputValue={email} handleChange={(value: string) => setEmail(value) }/>
            <SignupInput title='Username' inputType='text' inputValue={username} handleChange={(value:string) => setUserName(value)}/>
            <SignupSelectCountry value={selectedCountry} handleChange={(value:Country) => setSelectedCountry(value)} />
          </div>
        )
      case 1:
        return (
          <div id='Bio' className='space-y-12 flex flex-col mt-5 items-center w-full'>
            <SignupImageInput username={username} handleChange={(value: string) => setProfilePic(value)} />
            <SignupInput title='Greetings!' inputType='text' inputValue={greetings} handleChange={(value: string) => setGreetings(value)} />
            <SignupTextAreaInput title='About' inputValue={about} handleChange={(value: string) => setAbout(value)} className={'border-2 border-gray-300 rounded-3xl p-2 h-28 w-full focus:border-violet-400 outline-none resize-none'}/>
            <SignupSelectPlatform value={selectedPlatform} handleChange={(value:Platform) => setSelectedPlatform(value)}/>
          </div>
        )
      case 2:
        return (
          <div id='SocialMedia' className='space-y-12 flex flex-col mt-5 items-center w-full'>
            {platform.platforms.map((platform, idx) => (
              <div className='flex items-center space-x-5' key={idx}>
                <Image src={platform.logo} height={42} width={42}/>
                <SignupInput title={platform.name} inputType='text' inputValue={socialMedia[platform.name.toLowerCase() as keyof SocialMedia]} handleChange={(value:string) => setSocialMedia(socialMedia => ({...socialMedia, [platform.name.toLowerCase()]:value}))} />
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
    console.log('E-mail: ' + email);
    console.log('Username: ' + username);
    console.log('Country: ' + selectedCountry);
    console.log('Description: ' + about);
    console.log('Platform: ' + selectedPlatform);
    console.log('Social Media:' + JSON.stringify(socialMedia));
    let user: User = {
      email: email,
      country: selectedCountry?.name || '',
      username: username,
      profile_pic: profilePic,
      public: {
        banner_img: '',
        main_platform: selectedPlatform?.name || '',
        public_wallet: wallet?.adapter.publicKey || '',
        feed: {
          bio: {
            title: '',
            introduction: greetings,
            description: about,
            thumbnail: '',
          }
        },
        social_media: {
          ...socialMedia
        }
      }
    }
    if(acceptedTC){
      const res = await fetch('http://localhost:3000/api/users/addUser',
        {method: 'POST',
        body: JSON.stringify(user)
        }
      )
      loadingCallBack(false)
      if(finishedCallBack){
        finishedCallBack(true, username)
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