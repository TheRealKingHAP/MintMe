import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect} from 'react'
import SkeletonUserCard from '../components/skeletons/SkeletonUserCard'
import UserCard from '../components/users/UserCard'
import { UserType } from '../types/users/UserType'

const Explore = () => {
    const [users, setUsers] = useState<UserType[]>([])

    //Filter the user countries and remove the duplicated ones
    const [selectedCountry, setSelectedCountry] = useState("México");
    const userCountries: string[] = users.map((m) => m.country);
    const result: string[] = Array.from(new Set(userCountries));
    //Handle the select element when option is changed
    const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedCountry(event.currentTarget.value);
    }
    //Filter the array of users by country
    const filteredUsers: UserType[] = users.filter((a) => {
        return a.country == selectedCountry;
    })
    //Fetch the list of users from api
    const getUsers = async () => {
        let userList: UserType[] = []
        const result = await fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then((data: UserType[]) => userList = data)
        .catch(err => console.log(err.message))
        setUsers(userList);
    }
    useEffect (() => {
        getUsers()
    }, [])
    return (
        <div className='h-max flex flex-col justify-center items-center pt-[72px] space-y-20'>
            <h2 className='mt-20 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  w-3/4 lg:w-max text-center text-gray-800 font-bold'>Checkout the streamers working with us</h2>
            <div className=' w-3/4 flex flex-col items-center lg:items-start space-y-10'>
                <form>
                    <label className='font-semibold text-gray-800'>Filter by country: </label>
                    <select name='countryFilter' className='w-max border-green-300 border-2 rounded-lg outline-none' value={selectedCountry} onChange={handleChange}>
                        {result.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </form>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-12 justify-items-center sm:justify-items-start pb-12  w-full`}>
                    {users.length > 0 ? filteredUsers.map((user: UserType, index) => (
                        <Link href={'/user/'+user.first_name} key={index}>
                            <a>
                            <UserCard id={user.id} first_name={user.first_name} last_name={user.last_name} country={user.country} email={user.email} profile_pic={user.profile_pic} public={user.public} />
                            </a>
                        </Link>
                        
                    )
                    )
                    :
                    [0,1,2,3,4].map((index) => (
                        <SkeletonUserCard key={index} />
                    ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Explore;

