import React from 'react'
import SkeletonElement from '../SkeletonElement'

type Props = {}

function SkeletonDonationBlock({}: Props) {
  return (
    <div className='flex flex-col h-max rounded-md bg-gray-100 p-5  space-y-5'>
        <SkeletonElement type='title' className='rounded-xl'/>
        <div className='flex flex-col space-y-5'>
            <SkeletonElement type='text' className='rounded-lg' />
            <SkeletonElement type='text'className='rounded-lg' />
            <SkeletonElement type='text'className='rounded-lg' />
            <SkeletonElement type='text'className='rounded-lg' />
            <SkeletonElement type='text'className='rounded-lg' />
            <SkeletonElement type='text'className='rounded-lg' />
        </div>
    </div>
  )
}

export default SkeletonDonationBlock