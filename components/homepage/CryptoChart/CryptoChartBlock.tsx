import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import FormatInt from '../../../src/functions/FormatInt';
import { CoinMarketData } from '../../../types/coingecko/CoinMarketDataType';

type Props = {}

function CryptoChartBlock({}: Props) {
  const [coinData, setCoinData] = useState<CoinMarketData>();
  //Function to fetch some data from coingecko to display on the block
  const getData = async () => {
    let response: CoinMarketData[] = [] ;
    const result = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=solana&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => res.json())
    .then((data: CoinMarketData[]) => response = data)
    .catch((err) => console.log(err.message))
    if(response){
      setCoinData(response[0])
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='mt-16 w-full landscape:w-1/2 landscape:2xl:w-1/4 h-96 flex justify-between p-5'>
      <div className='text-center flex flex-col justify-center items-center'>
        <div id='SolanaIcon' className='h-max w-max bg-black rounded-full p-1'>
          <div className='relative h-20 w-20'>
            <Image src={'/icons/solana-bg-black.webp'} layout='fill' objectFit='cover' className='rounded-full' />
          </div>
        </div>
        <p className='font-bold text-gray-700 mt-5 landscape:2xl:text-xl'>Solana (SOL)</p>
      </div>
      <div className=' flex flex-col justify-center items-center'>
        <h4 className='font-bold text-gray-700 landscape:2xl:text-xl'>Trading Volume</h4>
        {coinData && <p className='font-medium text-gray-600 landscape:2xl:text-2xl mt-16'>{FormatInt({value: coinData.total_volume, currency:'USD', notation:'compact', style:'currency'})}</p>}
      </div>

    </div>
  )
}

export default CryptoChartBlock