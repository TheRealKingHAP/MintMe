import React from 'react'
import SkeletonElement from '../SkeletonElement'

type Props = {}

function SkeletonDonationForm({}: Props) {
  return (
    <div className='flex flex-col space-y-12 w-full  xl:text-left  xl:w-3/4 h-max rounded-md bg-gray-100 dark:bg-dark-mode-background-card-color p-2 xl:p-5'>
        <SkeletonElement type='title' className='rounded-xl' />
        <SkeletonElement type='block' className='rounded-lg' />
    </div>
  )
}

export default SkeletonDonationForm