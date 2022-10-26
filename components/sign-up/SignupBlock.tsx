import React, { useState } from 'react'
import Countries from '../../constants/countries';
import Platforms from '../../constants/platforms';
import CustomSelect from './form/Select/CustomSelect';
import CustomSelectOption from './form/Select/CustomSelectOption';
import SignupSelectCountry from './form/SignupSelectCountry';
import SignupSelectPlatform from './form/SignupSelectPlatform';
import SignupSelectPlatformCustom from './form/SignupSelectPlatformCustom';
import SignupInput from './SignupInput'
import SignUpSelect from './SignUpSelect';

type Props = {}

function SignupBlock({}: Props) {
  const [email, setEmail] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [formSelectIDX, setFormSelectIDX] = useState<number>(0);
  const country = new Countries()
  const platform = new Platforms()
  const renderSelectedForm = (IDX: number) => {
    switch (IDX) {
      case 0:
        return (
          <div id='PersonalInfo' className='space-y-12 flex flex-col items-center w-full'>
            <SignupInput title='E-mail' inputType='email' inputValue={email} handleChange={(value: string) => setEmail(value) }/>
            <SignupInput title='Username' inputType='text' inputValue={username} handleChange={(value:string) => setUserName(value)}/>
            <SignupSelectCountry handleChange={(value:string) => setSelectedCountry(value)} />
          </div>
        )
      case 1:
        return (
          <div id='Bio' className='space-y-12 flex flex-col items-center w-full'>
            <SignupInput title='Description' inputType='text' inputValue={description} handleChange={(value: string) => setDescription(value) }/>
            <SignupSelectPlatform handleChange={(value:string) => setSelectedPlatform(value)}/>
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
    console.log('Description: ' + description);
    console.log('Platform: ' + selectedPlatform);
  }
  return (
    <div className='bg-white mt-16 flex flex-col landscape:space-y-12 landscape:2xl:space-y-0 justify-between items-center h-full w-full landscape:2xl:h-full landscape:2xl:p-5 landscape:2xl:w-[24rem]'>
        <form onSubmit={handleSubmit} className={' flex flex-col items-center w-3/4 landscape:2xl:w-full'}>
          {
            renderSelectedForm(formSelectIDX)
          }
          <button type={formSelectIDX == 2 ? 'submit' : 'button'} onClick={formSelectIDX == 2 ? () => {} : handleFormStepChange} className='p-2 mt-36 landscape:mt-16 landscape:2xl:mt-52 w-24 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-medium'>{formSelectIDX == 2 ? 'Sign up' : 'Next'}</button>
        </form>
        <div className=''>
          <ul className='inline-flex space-x-5'>
            <li className={`rounded-full h-4 w-4 ${formSelectIDX == 0 ? 'bg-violet-500' : 'bg-gray-300'}`}></li>
            <li className={`rounded-full h-4 w-4 ${formSelectIDX == 1 ? 'bg-violet-500' : 'bg-gray-300'}`}></li>
            <li className={`rounded-full h-4 w-4 ${formSelectIDX == 2 ? 'bg-violet-500' : 'bg-gray-300'}`}></li>
          </ul>
        </div>
    </div>
  )
}

export default SignupBlock