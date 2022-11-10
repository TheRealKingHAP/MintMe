import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { User } from '../../../src/models/User'
import { UserType } from '../../../types/users/UserType'
import SkeletonTopUserCard from '../../skeletons/SkeletonTopUserCard'
import TopUserCard from './TopUserCard'

type Props = {}

function TopUsers({}: Props) {
  const [users, setUsers] = useState<User[]>()
  const getTopUsers = async () => {
    let userList: User[] = []
    const result = await fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then((data: User[]) => userList = data)
    .catch(err => console.log(err.message))
    if(userList.length > 0) {
      setUsers(userList.slice(0,5))
    }
  }
  useEffect(() => {
    getTopUsers()
  }, [])
  
  return (
    <div id='section-2' className=' w-3/4 h-max  2xl:h-screen  flex flex-col items-center'>
        <h3 className='font-bold text-gray-800 text-lg text-center xl:w-1/2  xl:text-xl 2xl:text-4xl'>Look who is using our platform to receive donations via crypto</h3>
        <div className='w-full flex flex-col space-y-12 2xl:space-y-0 2xl:flex-row 2xl:justify-between items-center 2xl:items-start mt-28 landscape:2xl:mt-40'>
          {users && users?.map((user, index) => (
            <Link href={`./user/${user.username}`} key={index}>
              <a>
                <TopUserCard key={index} username={user.username} img={user.profile_pic} mainplatform={user.public.main_platform} introduction={user.public.feed.bio.introduction}/>
              </a>
            </Link>
          ))}
          {!users && [0,1,2,3,4].map((index) => (
            <SkeletonTopUserCard key={index}/>
          ))}
        </div>
    </div>
  )
}

export default TopUsers