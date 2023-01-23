import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, {useState, useEffect} from 'react'
import { BsPerson, BsTwitch } from 'react-icons/bs'
import SkeletonDonationBlock from '../../components/skeletons/userpage/SkeletonDonationBlock'
import SkeletonDonationForm from '../../components/skeletons/userpage/SkeletonDonationForm'
import SkeletonUserBanner from '../../components/skeletons/userpage/SkeletonUserBanner'
import SkeletonUserFeed from '../../components/skeletons/userpage/SkeletonUserFeed'
import DonateForm from '../../components/users/userPage/donations/DonateForm'
import DonationBlock from '../../components/users/userPage/donations/DonationBlock'
import FeedBio from '../../components/users/userPage/FeedBio'
import UserBanner from '../../components/users/userPage/UserBanner'
import useDonations from '../../src/hooks/my_account/useDonations'
import { Donation } from '../../src/models/Donation'
import { User } from '../../src/models/User'
import { UserType } from '../../types/users/UserType'

function UserPage() {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const donations = useDonations(user?._id?.toString() || '')
  async function getData (id?: string | string[]){
    let userData: User = {} as User
    const reqUsers = await fetch(`http://localhost:3000/api/users/${id}`)
    .then(res => res.json())
    .then((data: User) => userData = data)
    .catch(err => console.log(err.message))
    setUser(userData);
  }
  useEffect(() => {
    if(!router.isReady) return;
    getData(router.query.userName)
  }, [router.isReady])
  return (
    <div className='h-max pb-12 space-y-12 dark:bg-dark-mode-background-background  flex flex-col items-center'>
      {user ? 
        <UserBanner username={user.username} profile_pic={user.profile_pic} banner_img={user.public.banner_img} social_media={user.public.social_media} />
      : 
        <SkeletonUserBanner />
      }
      <div id='Feed' className='w-3/4 h-max flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10'>
        <div id='' className='flex-1 space-y-10'>
          {user ? 
            <FeedBio title={user.public.feed.bio.title} description={user.public.feed.bio.description} thumbnail={user.public.feed.bio.thumbnail}/>
          : 
            <SkeletonUserFeed />
          }
          <div className='space-y-5'>
          {((donations.data || '').length > 0 && !donations.isLoading) ? <DonationBlock title='Top donations' donations={donations.data || []}/> : null}
          {donations.isLoading ? <SkeletonDonationBlock /> : null}
          {(!donations.isLoading && (donations.data || '').length <= 0) ? <div className='font-semibold text-gray-600 dark:text-gray-200 text-xl text-center'>No donations</div>: null}
          </div>
        </div>
        <div id='' className='flex-1'>
          {user ? 
            <DonateForm id={user._id?.toString() || ''} username={user.username} user_wallet={user.public.public_wallet} />
          :
            <SkeletonDonationForm />
          }
        </div>
      </div>
    </div>
  )
}


export default UserPage