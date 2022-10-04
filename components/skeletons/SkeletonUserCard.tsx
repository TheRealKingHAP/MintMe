import React from 'react'
import SkeletonElement from './SkeletonElement'

type Props = {}

function SkeletonUserCard({}: Props) {
  return (
    <div className='w-52 bg-gray-100 h-52  rounded-xl flex flex-col justify-center items-center space-y-5 relative '>
        <SkeletonElement type='profile-pic'/>
        <div className='h-max w-1/2 space-y-2'>
            <SkeletonElement type='text' className='rounded-lg'/>
            <SkeletonElement type='text' className='rounded-lg'/>            
        </div>
    </div>
  )
}

export default SkeletonUserCard