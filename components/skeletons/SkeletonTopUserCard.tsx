import React from 'react'
import SkeletonElement from './SkeletonElement'

type Props = {}

function SkeletonTopUserCard({}: Props) {
  return (
<div className='flex flex-col space-y-5 bg-gray-100 p-2 rounded-md items-center text-center 2xl:items-start 2xl:text-left  w-52 h-max cursor-pointer'>
    <SkeletonElement type='card-image' className='rounded-md'/>
    <div className='flex flex-col space-y-5 w-full h-max'>
      <SkeletonElement type='paragraph' className='rounded-lg'/>
      <SkeletonElement type='text' className='rounded-xl'/>
    </div>
</div>
  )
}

export default SkeletonTopUserCard