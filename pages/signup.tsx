import React, {useState} from 'react'
import SignupBlock from '../components/sign-up/SignupBlock'
import {AiOutlineLoading} from 'react-icons/ai'
import { useRouter } from 'next/router'
import LoaderComponent from '../components/LoaderComponent'
import { BsCheckCircleFill } from 'react-icons/bs'
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
        <div className='w-full h-[calc(100vh-96px)]'>
          <div id='Loading' className={` flex-col justify-center items-center space-y-24 h-full w-full ${!signUpFinished ? 'flex' : 'hidden'}`}>
            <div className='text-center'>
              <h4 className='text-gray-700 text-2xl font-semibold'>Please wait!</h4>
              <p className='text-gray-500 text-lg font-medium mt-5'>We are setting up your account...</p>
            </div>
            <LoaderComponent />
          </div>
          <div className={` flex-col justify-center items-center w-full h-full ${signUpFinished ? 'flex' : 'hidden'}`}>
            <BsCheckCircleFill className='text-green-500 h-7 w-7' />
            <p className='text-gray-500 text-lg font-medium mt-5'>Your page is ready</p>
          </div>
        </div>
        :
        null
      }
      {!isLoading && !signUpFinished ? 
        <SignupBlock finishedCallBack={(isFinished: boolean, username: string) => handleFinishSignup(isFinished, username)} loadingCallBack={(value: boolean) => setIsLoading(value) } />
        :
        null
      }
    </div>
  )
}

export default SignUp