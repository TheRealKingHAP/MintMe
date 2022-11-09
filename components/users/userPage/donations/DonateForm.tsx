import { PublicKey } from '@solana/web3.js';
import React, {SetStateAction, useState, useEffect} from 'react'
import { CoinPrice, Currency } from '../../../../types/users/userPage/donation/CoinPriceType';

function DonateForm({username, user_wallet}: {username: string, user_wallet:string | PublicKey}) {
    const [coinPrice, setCoinPrice] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState('usd');
    const [amountCrypto, setAmountCrypto] = useState(0);
    const [amountCurrency, setAmountCurrency] = useState(0)
    const handleCurrencyChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedCurrency(event.currentTarget.value);
    }
    const getCoinPrice = async (currency: string) => {
        let price: number = 0;
        const result = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=${selectedCurrency}`)
        .then(res => res.json())
        .then((data: CoinPrice) => price = data.solana[currency as keyof Currency] || 0)
        .catch(err => console.log(err.message))
        setCoinPrice(price);
        setAmountCurrency(coinPrice * amountCrypto)

    }
    useEffect(() => {
        getCoinPrice(selectedCurrency);
    }, [selectedCurrency])
    return (
    <div className='flex flex-col text-center w-full  xl:text-left  xl:w-3/4 h-max rounded-md bg-gray-100 p-2 xl:p-5'>
        <form className='space-y-10  landscape:px-16' onSubmit={(e)=>{e.preventDefault();}} >
            <label className='font-bold text-gray-700 text-base lg:text-lg xl:text-xl 2xl:text-2xl'>Donate to {username} !</label>
                <p className='text-gray-600 w-full line-clamp-6 font-medium'>Support {username} by donating some Solana. </p>
                <div className='flex flex-col space-y-5 w-full'>
                    <div className='w-full flex '>
                        <select className='xl:p-2 landscape:w-24 xl:w-24 rounded-tl-md rounded-bl-md border-r-[1px] font-medium outline-none text-gray-600 ' >
                            <option value={'SOL'}>SOL</option>
                        </select>
                        <input type={'number'} step={'0.01'}  value={amountCrypto} onChange={(e) => {setAmountCrypto(e.currentTarget.valueAsNumber), setAmountCurrency(e.currentTarget.valueAsNumber * coinPrice)}}  className='rounded-tr-md rounded-br-md outline-transparent focus:outline-violet-500 transition-all ease-in-out duration-200 w-full p-2'/>
                    </div>
                    <div className='w-full flex'>
                        <select className='xl:p-2 landscape:w-24 xl:w-24 rounded-tl-md rounded-bl-md border-r-[1px] font-medium outline-none text-gray-600 ' aria-expanded={'false'} value={selectedCurrency} onChange={handleCurrencyChange}>
                            <option value={'usd'}>USD</option>
                            <option value={'cad'}>CAD</option>
                            <option value={'mxn'}>MXN</option>
                            <option value={'eur'}>EUR</option>
                            <option value={'jpy'}>JPY</option>
                        </select>
                        <input type={'number'} min={'1'} step={'.01'} value={amountCurrency}  onChange={(e) => {setAmountCurrency(e.currentTarget.valueAsNumber), setAmountCrypto(e.currentTarget.valueAsNumber / coinPrice)}} className='rounded-tr-md rounded-br-md outline-transparent focus:outline-violet-500 transition-all ease-in-out duration-200 w-full p-2'/>
                    </div>
                    <p className='font-semibold text-gray-700 '>1 SOL = {coinPrice} {selectedCurrency.toUpperCase()}</p>
                    <button className=' bg-violet-500 text-white font-medium p-2 rounded-md cursor-pointer'>Donate</button>
                    <span className='text-gray-400 text-sm'>Powered by <a target={'_blank'} href='https://www.coingecko.com/en/coins/solana' className='font-semibold text-violet-400'>CoinGecko</a></span>
                </div>
        </form>

    </div>
  )
}

export default DonateForm