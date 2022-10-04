import Image from 'next/image'
import React from 'react'
import { FeedBlock } from '../../../types/users/userPage/FeedBlockType'

function FeedBio(data: FeedBlock) {
  return (
    <div className='flex flex-col p-5 space-y-12 items-center border-2 w-full border-gray-200 rounded-md text-center'>
        <p className='text-gray-800 font-bold text-base lg:text-lg xl:text-xl 2xl:text-2xl'>{data.title}</p>
        {data.thumbnail &&
            <div className='relative w-32 h-32 '>
                <Image src={data.thumbnail} layout='fill' objectFit='contain' />
            </div>
        }
        <p className='text-gray-700 w-full line-clamp-6 font-semibold'>{data.description}</p>
    </div>
  )
}

export default FeedBio