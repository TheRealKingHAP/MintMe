import React from 'react'
import SignupBlock from '../components/sign-up/SignupBlock'

type Props = {}

function SignUp({}: Props) {
  return (
    <div className='flex flex-col w-full justify-start items-center landscape:2xl:flex-row landscape:2xl:justify-center landscape:2xl:items-start h-[calc(100vh-5rem)]  landscape:lg:h-[calc(100vh-96px)]  landscape:2xl:h-[calc(100vh-96px)]'>
        <div className='w-full bg-white h-full mt-16 landscape:2xl:mt-0 landscape:2xl:space-y-12 landscape:2xl:w-max flex flex-col items-center landscape:2xl:flex-1'>
            <h3 className='text-center font-bold text-gray-800 text-2xl landscape:2xl:text-3xl landscape:2xl:mt-12'>Create an account</h3>
            <p className='text-center mt-2 w-3/4 landscape:2xl:w-full text-base landscape:2xl:text-xl text-gray-400'>Let's get started, please enter the information required below</p>
            <SignupBlock />
        </div>
        <div className='hidden landscape:2xl:block bg-violet-400 w-full h-full  flex-1'>
        </div>
    </div>
  )
}

export default SignUp