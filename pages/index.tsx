import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import TopUsers from '../components/homepage/TopUser/TopUsers'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MintMe</title>
        <meta name="description" content="Web 3.0 crypto donation service for streamers and content creators" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col h-max lg:pt-[96px] pb-5  items-center 2xl:space-y-10 text-gray-800'>
        <div id='section-1' className='w-full   h-screen  flex flex-col-reverse 2xl:flex-row'>
          <div className='h-3/4 w-full flex justify-center 2xl:items-center'>
            <div className='relative h-56 w-56 xl:h-[30rem] xl:w-[30rem]'>
              <Image src={'/money_transfer.svg'} layout='fill' objectFit='contain'/>
            </div>
        </div>
        <div className='h-3/4 w-full  flex flex-col items-center text-center 2xl:text-left 2xl:items-start justify-center space-y-10 2xl:space-y-16 px-12'>
            <h3 className=' font-bold text-gray-800 text-2xl 2xl:text-7xl'>Welcome to MintMe!</h3>
            <p className=' 2xl:w-3/4 font-medium  text-gray-600 text-base xl:text-lg 2xl:text-2xl'>Here is the place where you can accept donations and get support from your community in crypto with Solana.</p>
            <Link href={'/signup'}><a className='p-2 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-semibold'>Create my page</a></Link>
          </div>
        </div>
        <TopUsers/>
      </main>
    </div>
  )
}

export default Home
