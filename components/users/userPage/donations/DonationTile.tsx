import React from 'react'
import {BiCoinStack} from 'react-icons/bi'
import { Donation } from '../../../../types/users/userPage/donation/DonationType'
function DonationTile(data: Donation) {
  return (
    <div className='flex md:space-x-12 border-2 border-gray-300 rounded-md p-5'>
        <div className='flex flex-1 text-ellipsis overflow-hidden space-x-2 md:space-x-0 md:justify-between'>
            <p className='hidden md:block font-semibold w-1/4  2xl:w-1/2  text-ellipsis overflow-hidden'>{data.sender}</p>
            <p className='hidden md:block font-medium text-gray-700'>sent:</p>
            <p className='font-medium text-violet-800 flex items-center'>{data.amount} <BiCoinStack className='h-5 w-5'/></p>
        </div>
        <p className='font-normal text-gray-500'>{data.date}</p>
    </div>
  )
}

export default DonationTile