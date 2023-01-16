import Image from 'next/image'
import React from 'react'
import {BiCoinStack} from 'react-icons/bi'
import { Donation } from '../../../../src/models/Donation'
import FormatInt from '../../../../src/utils/FormatInt'
import ShortenString from '../../../../src/utils/ShortenString'
function DonationTile(data: Donation) {
  return (
    <div className='flex md:space-x-12 border-2 border-gray-300 dark:border-transparent dark:bg-dark-mode-background-hover-color rounded-md p-5'>
        <div className='flex flex-1 text-ellipsis overflow-hidden space-x-2 md:space-x-0 md:justify-between'>
            <p className='hidden md:block font-semibold w-1/2  2xl:w-1/2  text-ellipsis overflow-hidden'>{(data.sender === '' || null || undefined) ? 'Anonymous donator' : ShortenString(data.sender, 5)}</p>
            <p className='hidden md:block font-medium text-gray-700 dark:text-gray-50'>sent:</p>
            <div className='font-medium text-violet-500 dark:font-bold flex space-x-2 items-center'>
            <span>{FormatInt({value: data.amount, currency: 'USD', notation: 'compact', style: 'currency', maximumFractionDigits: 2})}</span>
            <div className='relative h-max w-max '>
              <div className='h-5 w-5 relative'>
                <Image src={'/icons/solana-bg-black.webp'} layout='fill' objectFit='cover' className='rounded-full' />
              </div>
            </div>
            </div>
        </div>
        <p className='font-normal text-gray-500 dark:text-gray-300'>{data.date ? data.date : 's/f'}</p>
    </div>
  )
}

export default DonationTile