import React, { useState } from 'react'
import Countries from '../../constants/countries';
import Platforms from '../../constants/platforms';
import SignupSelectCountry from './form/SignupSelectCountry';
import SignupSelectPlatform from './form/SignupSelectPlatform';
import SignupTextAreaInput from './form/SignupTextAreaInput';
import SignupImageInput from './SignupImageInput';
import SignupInput from './SignupInput'

type Props = {}

function SignupBlock({}: Props) {
  const [email, setEmail] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [greetings, setGreetings] = useState<string>('')
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [formSelectIDX, setFormSelectIDX] = useState<number>(0);
  const renderSelectedForm = (IDX: number) => {
    switch (IDX) {
      case 0:
        return (
          <div id='PersonalInfo' className='space-y-12 mt-5 flex flex-col items-center w-full'>
            <SignupInput title='E-mail' inputType='email' inputValue={email} handleChange={(value: string) => setEmail(value) }/>
            <SignupInput title='Username' inputType='text' inputValue={username} handleChange={(value:string) => setUserName(value)}/>
            <SignupSelectCountry handleChange={(value:string) => setSelectedCountry(value)} />
          </div>
        )
      case 1:
        return (
          <div id='Bio' className='space-y-12 flex flex-col mt-5 items-center w-full'>
            <SignupImageInput username={username}  />
            <SignupInput title='Greetings!' inputType='text' inputValue={greetings} handleChange={(value: string) => setGreetings(value)} />
            <SignupTextAreaInput title='About' inputValue={about} handleChange={(value: string) => setAbout(value)} className={'border-2 border-gray-300 rounded-3xl p-2 h-28 w-full focus:border-violet-400 outline-none resize-none'}/>
            <SignupSelectPlatform handleChange={(value:string) => setSelectedPlatform(value)}/>
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
      default:
        return null
    }
  }
  const handleFormStepChange = () => {
    setFormSelectIDX(formSelectIDX+1);
  }
  function handleSubmit (e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log('E-mail: ' + email);
    console.log('Username: ' + username);
    console.log('Country: ' + selectedCountry);
    console.log('Description: ' + about);
    console.log('Platform: ' + selectedPlatform);
  }
  return (
    <div className='bg-white flex flex-col space-y-16 pb-5 landscape:2xl:space-y-0 justify-between items-center h-full  w-full landscape:2xl:w-3/4'>
        {renderTitle(formSelectIDX)}
        <form onSubmit={handleSubmit} className={'flex flex-col items-center w-3/4 landscape:2xl:w-[24rem]'}>
          {
            renderSelectedForm(formSelectIDX)
          }
          <button type={'submit'} className={`p-2 mt-24 w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-medium ${formSelectIDX === 2 ? 'block' : 'hidden'} `}>{'Sign up'}</button>
        </form>
        <button type={'button'} onClick={formSelectIDX == 2 ? () => {} : handleFormStepChange} className={`p-2 mt-24  w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-medium ${formSelectIDX === 2 ? 'hidden' : 'block'} `}>{'Next'}</button>

    </div>
  )
}

export default SignupBlock