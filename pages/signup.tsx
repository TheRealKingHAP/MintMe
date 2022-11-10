import React, {useState} from 'react'
import SignupBlock from '../components/sign-up/SignupBlock'
import {AiOutlineLoading} from 'react-icons/ai'
import { useRouter } from 'next/router'
type Props = {}

function SignUp({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signUpFinished, setSignUpFinished] = useState<boolean>(false)
  const router = useRouter()
  const handleFinishSignup = (isFinished: boolean, user: string) => {
    setSignUpFinished(isFinished);
    console.log(user)
    router.push(`/user/${user}`)
  }
  return (
    <div className='flex flex-col  w-full justify-start items-center landscape:2xl:h-[calc(100vh-96px)]'>
      {isLoading ?
        <div className='flex flex-col justify-center items-center space-y-24 w-full h-full'>
          <div className='text-center'>
            <h4 className='text-gray-700 text-2xl font-semibold'>Please wait!</h4>
            <p className='text-gray-500 text-lg mt-5'>We are setting up your account...</p>
          </div>
          <AiOutlineLoading className='text-violet-500 w-7 h-7 animate-spin'/>
        </div>
        :
        <SignupBlock finishedCallBack={(isFinished: boolean, username: string) => handleFinishSignup(isFinished, username)} loadingCallBack={(value: boolean) => setIsLoading(value) } />
      }
    </div>
  )
}

export default SignUp