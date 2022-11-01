import Image from 'next/image'
import React from 'react'

interface UserBannerType{
    username: string,
    profile_pic: string,
    banner_img: string
}

function UserBanner({username, profile_pic, banner_img } : UserBannerType) {
  return (
    <div className='w-full flex flex-col justify-center items-center space-y-10'>
        <div className='w-full flex flex-col items-center relative'>
        {(!banner_img) ? <div className='w-full bg-slate-300 h-96'></div> 
        :
        <div className='w-full bg-green-300 h-96 relative'>
          <Image src={banner_img} layout='fill' objectFit='cover' />
        </div>
        }
        <div id='profilePic' className='w-max border-2 border-green-400 rounded-full absolute -bottom-16'>
            <div className='relative h-32 w-32 bg-amber-400 rounded-full'>
            <Image src={profile_pic} layout={'fill'} objectFit={'contain'} className='rounded-full' />
            </div>
        </div>
        </div>
        <div className='w-full flex flex-col items-center'>
            <p className='mt-10 font-bold text-base md:text-lg lg:text-xl xl:text-2xl'>{username}</p>
        </div>
    </div>
  )
}

export default UserBanner