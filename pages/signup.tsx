import React, {useState} from 'react'
import SignupBlock from '../components/sign-up/SignupBlock'
import {AiOutlineLoading} from 'react-icons/ai'
import { useRouter } from 'next/router'
import LoaderComponent from '../components/LoaderComponent'
import { BsCheckCircleFill, BsX } from 'react-icons/bs'
import SnackBar from '../components/notifications/SnackBar'
import Head from 'next/head'
type Props = {}

function SignUp({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signUpFinished, setSignUpFinished] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [index, setIndex] = useState<number>(0);
  const router = useRouter()
  const handleFinishSignup = (isFinished: boolean, user: string, error?: string, success?: string) => {
    setIsLoading(false)
    setSignUpFinished(isFinished);
    console.log(error)
    if(error) {
      setError(error)
      setTimeout(() => {
        setSignUpFinished(false)
        setIndex(0);
      } , 2000)
      return
    }
    router.push(`/my_account/overview`)
  }
  return (
    <div className='flex flex-col  w-full justify-start items-center landscape:2xl:h-[calc(100vh-96px)]'>
    <Head>
      <title>Sign up</title>
      <meta name='description' content='Hi please sign up' />
      <meta name="twitter:title" content="MintMe: Sign up page" />
      <meta name="twitter:description" content="Hi please sign up" />            
      <meta property='og:title' content='MintMe: Sign up page' />
      <meta property='og:description' content='Hi please sign up' />
    </Head>
      {isLoading || signUpFinished ?
        <div className='w-full h-[calc(100vh-96px)]'>
          <div id='Loading' className={` flex-col justify-center items-center space-y-24 h-full w-full ${!signUpFinished ? 'flex' : 'hidden'}`}>
            <div className='text-center'>
              <h4 className='text-gray-700 text-2xl font-semibold'>Please wait!</h4>
              <p className='text-gray-500 text-lg font-medium mt-5'>We are setting up your account...</p>
            </div>
            <LoaderComponent />
          </div>
          {!error && signUpFinished ? 
          <div className={` flex-col justify-center items-center w-full h-full flex`}>
            <BsCheckCircleFill className='text-green-500 h-7 w-7' />
            <p className='text-gray-500 dark:text-dark-secondary text-lg font-medium mt-5'>Your page is ready</p>
          </div>
          :
          null
          }
          {error ?
          <div className={` flex-col justify-center items-center w-full h-full flex`}>
            <BsX className='text-red-500 h-7 w-7' />
            <p className='text-gray-500 dark:text-dark-secondary text-lg font-medium mt-5'>{error}</p>
         </div>
          :
          null
          }
        </div>
        :
        null
      }
      {!isLoading && !signUpFinished ? 
        <SignupBlock changeFormStep={(idx: number) => setIndex(idx)} idx={index} finishedCallBack={(isFinished: boolean, user: string, error?: string, success?: string) => handleFinishSignup(isFinished, user, error, success)} loadingCallBack={(value: boolean) => setIsLoading(value) } />
        :
        null
      }
    </div>
  )
}

export default SignUp