import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect} from 'react'
import SkeletonUserCard from '../components/skeletons/SkeletonUserCard'
import UserCard from '../components/users/UserCard'
import Countries from '../constants/countries'
import { User } from '../src/models/User'
import { UserType } from '../types/users/UserType'
import Head from 'next/head'

const Explore = () => {
    const [users, setUsers] = useState<User[]>([])
    const [selectedCountry, setSelectedCountry] = useState('México');
    //Filter the user countries and remove the duplicated ones
    const {countries} = new Countries()
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
        const result = await fetch(`http://localhost:3000/api/users?country=${selectedCountry}`)
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
    }, [selectedCountry])
    return (
        <div className='h-max flex flex-col bg-white dark:bg-dark-mode-background-background justify-center items-center pt-[72px] space-y-20'>
            <Head>
                <title>Explore page</title>
                <meta name='description' content='Hi welcome to the MintMe explore page, here you can find all the users that are currently accepting donations via MintMe' />
                <meta name="twitter:title" content="MintMe: Explore page" />
                <meta name="twitter:description" content="Hi welcome to the MintMe explore page, here you can find all the users that are currently accepting donations via MintMe" />            
                <meta property='og:title' content='MintMe: Explore page' />
                <meta property='og:description' content='Hi welcome to the MintMe explore page, here you can find all the users that are currently accepting donations via MintMe' />
            </Head>
            <h2 className='mt-20 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  w-3/4 lg:w-max text-center text-gray-800 dark:text-white font-bold'>Checkout the streamers working with us</h2>
            <div className=' w-3/4 flex flex-col items-center lg:items-start space-y-10'>
                <form>
                    <label className='font-semibold text-gray-800 dark:text-white'>Filter by country: </label>
                    <select name='countryFilter' className='w-24 border-violet-500 bg-white dark:bg-dark-mode-background-hover-color border-2 rounded-lg outline-none' value={selectedCountry} onChange={handleChange}>
                        {countries.map((country, index) => (
                            <option value={country.name} key={index}>{country.name}</option>
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

