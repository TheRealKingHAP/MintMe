import Image from 'next/image'
import React from 'react'
import Platforms from '../../../constants/platforms'
import { SocialMedia } from '../../../src/models/SocialMedia'

interface UserBannerType{
    username: string,
    profile_pic: string,
    banner_img: string,
    social_media: SocialMedia
}

function UserBanner({username, profile_pic, banner_img, social_media } : UserBannerType) {
  const platform = new Platforms()
  return (
    <div className='w-full flex flex-col justify-center items-center space-y-10'>
        <div className='w-full flex flex-col items-center relative'>
        {(!banner_img) ? <div className='w-full bg-slate-300 h-96'></div> 
        :
        <div className='w-full bg-green-300 h-96 relative'>
          <Image src={banner_img} layout='fill' objectFit='cover' />
        </div>
        }
        <div id='profilePic' className='w-max border-2 border-violet-500 rounded-full absolute -bottom-16'>
            <div className='relative h-32 w-32 bg-amber-400 rounded-full'>
            <Image src={profile_pic} layout={'fill'} objectFit={'cover'} className='rounded-full' />
            </div>
        </div>
        </div>
        <div className='w-full flex flex-col items-center'>
            <p className='mt-10 font-bold text-base md:text-lg lg:text-xl xl:text-2xl'>{username}</p>
            <ul className='list-none inline-flex space-x-5 mt-2'>
              {platform.platforms.map((platform, index) =>{
                if(social_media[platform.name.toLowerCase() as keyof SocialMedia]){
                  return (
                    <a href={social_media[platform.name.toLowerCase() as keyof SocialMedia]} target='_blank' key={index}><li className='relative h-5 w-5'><Image src={platform.logo} layout='fill' objectFit='contain' /></li></a>
                  )
                }
              })}
            </ul>
        </div>
    </div>
  )
}

export default UserBanner