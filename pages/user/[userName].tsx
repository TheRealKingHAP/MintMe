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
import { Donation } from '../../types/users/userPage/donation/DonationType'
import { UserType } from '../../types/users/UserType'

function UserPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType>()
  const [donations, setDonations] = useState<Donation[]>([])
  const getData = async (id?: string | string[]) => {
    let userList: UserType[] = []
    let donationList: Donation[] = []
    const reqUsers = await fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then((data: UserType[]) => userList = data)
    .catch(err => console.log(err.message))
    const selectedUser = userList.filter((a) => {
      return a.first_name == id
    })   
    const reqDonation = await fetch('http://localhost:3000/api/donations')
    .then(res => res.json())
    .then((data: Donation[]) => donationList = data)
    .catch(err => console.log(err.message));
    const userDonations: Donation[] = donationList.filter((i) => {
      return i.receiver.id.$oid == selectedUser[0].id.$oid
    })
    setUser(selectedUser[0]);
    setDonations(userDonations);
  }
  useEffect(() => {
    if(!router.isReady) return;
    getData(router.query.userName)
  }, [router.isReady])
  return (
    <div className='h-max lg:pt-[96px] pb-12 space-y-12  flex flex-col items-center'>
      {user && <UserBanner first_name={user.first_name} last_name={user.last_name} profile_pic={user.profile_pic} banner_img={user.public.banner_img} />}
      {!user && <SkeletonUserBanner />}
      <div id='Feed' className='w-3/4 h-max flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10'>
        <div id='' className='flex-1 space-y-10'>
          {user && <FeedBio title={user.public.feed.bio.title} description={user.public.feed.bio.description} thumbnail={user.public.feed.bio.thumbnail}/>}
          {!user && <SkeletonUserFeed />}
          <div className='space-y-5'>
          {donations.length > 0 && <DonationBlock donations={donations}/>}
          {donations.length <= 0 && <SkeletonDonationBlock />}
          </div>
        </div>
        <div id='' className='flex-1'>
          {user && <DonateForm username={user.first_name} user_wallet={user.public.public_wallet} />}
          {!user && <SkeletonDonationForm />}
        </div>
      </div>
    </div>
  )
}


export default UserPage