import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import CryptoChartBlock from '../components/homepage/CryptoChart/CryptoChartBlock'
import TopUsers from '../components/homepage/TopUser/TopUsers'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MintMe</title>
        <meta name="description" content="Web 3.0 crypto donation service for streamers and content creators" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-white dark:bg-dark-mode-background-background flex flex-col h-max  space-y-16 landscape:space-y-16 pb-5  items-center landscape:2xl:space-y-10 text-gray-800'>
        <div id='section-1' className='w-full h-screen landscape:h-max landscape:2xl:h-screen landscape:space-y-16 landscape:2xl:space-y-0  flex flex-col-reverse 2xl:flex-row'>
          <div className='landscape:2xl:h-3/4 w-full flex justify-center 2xl:items-center'>
            <div className='relative h-56 w-56 landscape:mt-16 landscape:2xl:mt-0 xl:h-[30rem] xl:w-[30rem]'>
              <Image src={'/money_transfer.svg'} layout='fill' objectFit='contain'/>
            </div>
          </div>
          <div className='h-3/4 w-full  flex flex-col items-center text-center 2xl:text-left 2xl:items-start justify-center space-y-10 2xl:space-y-16 px-12'>
            <h3 className=' font-bold text-gray-800 dark:text-white text-2xl 2xl:text-7xl'>Welcome to MintMe!</h3>
            <p className=' 2xl:w-3/4 font-medium  text-gray-600 dark:text-gray-200 text-base xl:text-lg 2xl:text-2xl'>Here is the place where you can accept donations and get support from your community in crypto with Solana.</p>
            <Link href={'/signup'}><a className='p-2 rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 text-white font-semibold'>Create my page</a></Link>
          </div>
        </div>
        <TopUsers/>
        <div className='w-full flex flex-col items-center p-5  h-screen landscape:h-max landscape:2xl:h-screen '>
          <p className='text-gray-600 dark:text-gray-200 text-lg lg:text-xl 2xl:text-2xl'>¿Why MintMe?</p>
          <h4 className='mt-16 w-3/4 2xl:w-1/2 text-center font-bold text-gray-800 dark:text-white text-lg lg:text-xl 2xl:text-4xl'>Extraordinary donations for extraordinary creators!</h4>
          <p className='mt-16 w-3/4 2xl:w-1/2 text-center font-medium text-gray-500 dark:text-gray-300 xl:text-lg 2xl:text-2xl'>With MintMe you are not only receiving money, you are getting a much valuable asset, you will recieve <strong>Solana</strong>, one of the most used and beloved coin in the cryptomarket right now.</p>
          <CryptoChartBlock />
        </div>
      </main>
    </div>
  )
}

export default Home
