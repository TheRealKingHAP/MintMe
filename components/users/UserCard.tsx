import Image from 'next/image'
import React from 'react'
import { User } from '../../src/models/User'

function UserCard(userInfo : User) {
  return (
    <div className='w-52 bg-white dark:bg-dark-mode-background-card-color h-64 shadow-md dark:shadow-none rounded-xl flex flex-col justify-center items-center space-y-2 relative hover:scale-95 cursor-pointer transform transition-all duration-100 ease-in-out'>
        <div className='w-full h-full relative'>
            <Image src={userInfo.profile_pic} objectFit='cover' layout='fill' className='rounded-t-xl' />
        </div>
        <div className='text-center p-2'>
            <p className='font-semibold text-gray-700 dark:text-gray-50'>{userInfo.username}</p>
            <p className='font-light text-gray-500 dark:text-gray-300'>{userInfo.country.name}</p>
        </div>
    </div>
  )
}

export default UserCard