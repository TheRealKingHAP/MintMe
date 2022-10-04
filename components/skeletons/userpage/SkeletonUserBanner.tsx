import React from 'react'
import SkeletonElement from '../SkeletonElement'

type Props = {}

function SkeletonUserBanner({}: Props) {
  return (
    <div className='w-full flex flex-col justify-center items-center space-y-10'>
    <div className='w-full flex flex-col items-center relative'>
    <SkeletonElement type='banner'/>
    <div id='profilePic' className='w-max rounded-full absolute -bottom-16'>
        <SkeletonElement type='profile-pic'/>
    </div>
    </div>
    <div className='w-1/4'>
        <div className='mt-10 flex justify-center w-full'>
        <SkeletonElement type='title' className='rounded-xl'/>

        </div>
    </div>
</div>
  )
}

export default SkeletonUserBanner