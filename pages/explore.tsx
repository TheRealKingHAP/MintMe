import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect} from 'react'
import SkeletonUserCard from '../components/skeletons/SkeletonUserCard'
import UserCard from '../components/users/UserCard'
import { User } from '../src/models/User'
import { UserType } from '../types/users/UserType'

const Explore = () => {
    const [users, setUsers] = useState<User[]>([])
    const [selectedCountry, setSelectedCountry] = useState('');
    //Filter the user countries and remove the duplicated ones
    const userCountries: string[] = users.map((m) => m.country.name);
    const result: string[] = Array.from(new Set(userCountries));
    //Handle the select element when option is changed
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedCountry(event.currentTarget.value);
    }
    //Filter the array of users by country
    const filteredUsers: User[] = users.filter((a) => {
        return a.country.name == selectedCountry;
    })
    //Fetch the list of users from api
    const getUsers = async () => {
        let userList: User[] = []
        const result = await fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then((data: User[]) => userList = data)
        .catch(err => console.log(err.message))
        if(userList.length > 0) {
            setUsers(userList);
            setSelectedCountry(userList[0].country.name)
        }
        return
    }
    useEffect (() => {
        getUsers()
    }, [])
    return (
        <div className='h-max flex flex-col justify-center items-center pt-[72px] space-y-20'>
            <h2 className='mt-20 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  w-3/4 lg:w-max text-center text-gray-800 dark:text-white font-bold'>Checkout the streamers working with us</h2>
            <div className=' w-3/4 flex flex-col items-center lg:items-start space-y-10'>
                <form>
                    <label className='font-semibold text-gray-800 dark:text-white'>Filter by country: </label>
                    <select name='countryFilter' className='w-max border-violet-500 bg-white dark:bg-dark-mode-background-hover-color border-2 rounded-lg outline-none' value={selectedCountry} onChange={handleChange}>
                        {result.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </form>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-12 justify-items-center sm:justify-items-start pb-12  w-full`}>
                    {users.length > 0 ? filteredUsers.map((user: User, index) => (
                        <Link href={'/user/'+user.username} key={index}>
                            <a>
                            <UserCard username={user.username} country={user.country} email={user.email} profile_pic={user.profile_pic} public={user.public} />
                            </a>
                        </Link>
                        
                    )
                    )
                    :
                    Array(5).map((index) => (
                        <SkeletonUserCard key={index} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Explore;

