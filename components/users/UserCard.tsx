import Image from 'next/image'
import React from 'react'
import { User } from '../../src/models/User'
import { UserType } from '../../types/users/UserType'

function UserCard(userInfo : User) {
  return (
    <div className='w-52 bg-white h-52 shadow-md rounded-xl flex flex-col justify-center items-center space-y-5 relative hover:scale-95 cursor-pointer transform transition-all duration-100 ease-in-out'>
        <div className='w-20 h-20 relative'>
            <Image src={userInfo.profile_pic} objectFit='contain' layout='fill' />
        </div>
        <div className='text-center'>
            <p className='font-semibold text-gray-700'>{userInfo.first_name}</p>
            <p>{userInfo.country}</p>
        </div>
    </div>
  )
}

export default UserCard