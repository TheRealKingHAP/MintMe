import React from 'react'
import SkeletonElement from '../SkeletonElement'

type Props = {}

function SkeletonUserFeed({}: Props) {
  return (
    <div className='flex flex-col p-5 space-y-12 items-center w-full h-96 bg-gray-100 rounded-md'>
    <SkeletonElement type='title' className='rounded-xl'/>
    <SkeletonElement type='block' className='rounded-lg' />
    </div>
  )
}

export default SkeletonUserFeed