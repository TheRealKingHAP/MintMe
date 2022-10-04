import Image from 'next/image'
import React from 'react'

type UserCardProps = {
    username: string,
    img: string,
    mainplatform: string,
    introduction: string,

}

function TopUserCard({username, img, mainplatform, introduction}: UserCardProps) {
  return (
    <div className='flex flex-col space-y-2  items-center text-center 2xl:items-start 2xl:text-left  w-52 h-max cursor-pointer'>
        <div className='relative w-full h-48 bg-gray-100'>
            <Image src={img} layout='fill' objectFit='contain' />
        </div>
        <div className='h-16'>
        <p className='font-normal text-gray-500 line-clamp-2'> <strong className='text-gray-800'>{username}</strong> {introduction}</p>
        </div>
        <label className='font-medium text-base  text-gray-600'>Platform: <span className={`${mainplatform == 'Twitch' ? 'text-violet-400' : mainplatform == 'Youtube' ? 'text-red-400' : mainplatform == 'Facebook' ? 'text-blue-500' : mainplatform == 'Twitter' ? 'text-sky-400' : 'text-pink-400'}`}>{mainplatform}</span> </label>

    </div>
  )
}

export default TopUserCard