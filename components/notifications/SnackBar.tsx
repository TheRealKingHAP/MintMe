import React from 'react'
import { BsCheck, BsCheckCircleFill, BsX } from 'react-icons/bs'

type Props = {
    message?: string
    status?: 'Error' | 'Success'
    isVisible: boolean
    
}

function SnackBar({message, status, isVisible}: Props) {  
    return (
        <div className={`bg-white z-50 shadow-xl dark:shadow-none dark:bg-dark-mode-background-500 dark:text-white text-gray-800 w-3/4 2xl:w-72 p-2 fixed bottom-2 left-1/2 -translate-x-1/2 rounded-md ${!isVisible ? 'translate-y-[calc(100vh)]' : 'translate-y-0'}  transition-all ease-in-out duration-300`}>
            <div className='flex justify-evenly items-center'>
                <p className='font-semibold'>{message}</p>
                {status == 'Success' ? 
                <div className='rounded-full bg-green-500'>
                    <BsCheck className='text-white rounded-full h-5 w-5' />
                </div>
                :
                status == 'Error' ?
                <div className='rounded-full bg-red-500'>
                    <BsX className='text-white rounded-full h-5 w-5' />
                </div>
                :
                null
                }
            </div>
        </div>
    )
}

export default SnackBar