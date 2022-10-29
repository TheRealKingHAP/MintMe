import React from 'react'
import SignupBlock from '../components/sign-up/SignupBlock'

type Props = {}

function SignUp({}: Props) {
  return (
    <div className='flex flex-col  w-full justify-start items-center landscape:2xl:h-[calc(100vh-96px)]'>
      <SignupBlock />
    </div>
  )
}

export default SignUp