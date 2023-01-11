import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, Keypair, sendAndConfirmTransaction, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { useRouter } from 'next/router';
import React, {SetStateAction, useState, useEffect, useCallback} from 'react'
import { AiOutlineLoading } from 'react-icons/ai';
import { CoinPrice, Currency } from '../../../../types/users/userPage/donation/CoinPriceType';
import SnackBar from '../../../notifications/SnackBar';

interface TransactionStatus{
    status: 'Success' | 'Error',
    message: string,
}
function DonateForm({username, user_wallet, id}: {username: string, user_wallet:string | PublicKey, id: string}) {
    const [coinPrice, setCoinPrice] = useState(0);
    const {connection} = useConnection()
    const router = useRouter()
    const {wallet, publicKey, sendTransaction, signTransaction} = useWallet()
    const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>();
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false)
    const {setVisible} = useWalletModal()
    const [selectedCurrency, setSelectedCurrency] = useState('usd');
    const [amountCrypto, setAmountCrypto] = useState(0);
    const [amountCurrency, setAmountCurrency] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleCurrencyChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        setSelectedCurrency(event.currentTarget.value);
    }
    const onRequestConnectWallet = () => {
        setVisible(true)
    }
    const ShowSnackbar = () => {
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false)
        }, 2000);
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

    //fetching the back end for making a donation
    const handleDonation = useCallback( async (qty: number) => {
        if(!publicKey){
            setIsLoading(false)
            onRequestConnectWallet()
            return
        }
        if(qty <= 0){
            setIsLoading(false)
            console.log('Please enter a valid amount')
            return
        }
        try {
            //Client-side
            setIsLoading(true)
            //Streamer or influencer Public Key
            const receiverPublicKey = new PublicKey(user_wallet);
            //Fee Collector Public Key
            const feeCollector = new PublicKey('EVU5vd36z6MBL8RJaqwsTUVxxKMXCX6d6XyqAAi2SG9Z')
            //Total donation
            const amount = qty * LAMPORTS_PER_SOL;            
            //Send and request the transaction to the back-end with the desire values
            const res = await fetch(`${router.basePath}/api/donations/make_donation`, {
                method: 'POST',
                body: JSON.stringify({amount, receiverPublicKey, id, donator: publicKey})
            });
            if(!res.ok){
                throw Error('Sorry there was an error')
            }
            //Get response from server with the transaction pre-signed
            const result = await res.json();
            let recoveredTx: Transaction =  Transaction.from(Buffer.from(result));
            //Sign the transaction with the wallet adapter
            recoveredTx = await signTransaction!(recoveredTx);
            //Send the serialized transaction
            const final_Tx = await connection.sendRawTransaction(recoveredTx.serialize({requireAllSignatures: false}))
            const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash()
            //Confirm the transaction in the blockchain
            await connection.confirmTransaction({
                blockhash: blockhash,
                lastValidBlockHeight: lastValidBlockHeight,
                signature: final_Tx
            })
            const saveTx = await fetch(`${router.basePath}/api/donations/save_donation`, {
                method: 'POST',
                body: JSON.stringify({
                    receiver: id,
                    signature: final_Tx
                })
            });
            if(!saveTx.ok){
                throw Error('Something went wrong with the transaction')
            }
            setIsLoading(false)
            setTransactionStatus({status: 'Success', message: 'Donation complete!'})
            ShowSnackbar()
            return
        } catch (error: any) {
            setIsLoading(false)
            setTransactionStatus({status: 'Error', message: error.message})
            ShowSnackbar()
            return;
        }
    }, [publicKey, connection, sendTransaction])
    return (
    <div className='flex flex-col text-center w-full  xl:text-left  xl:w-3/4 h-max rounded-md bg-gray-100 dark:bg-dark-mode-background-card-color p-2 xl:p-5'>
        <form className='space-y-10  landscape:px-16' onSubmit={(e)=>{e.preventDefault();}} >
            <label className='font-bold text-gray-700 dark:text-gray-50 text-base lg:text-lg xl:text-xl 2xl:text-2xl'>Donate to {username} !</label>
                <p className='text-gray-600 dark:text-gray-200 w-full line-clamp-6 font-medium'>Support {username} by donating some Solana. </p>
                <div className='flex flex-col space-y-5 w-full'>
                    <div className='w-full flex '>
                        <select className='xl:p-2 landscape:w-24 xl:w-24 rounded-tl-md rounded-bl-md border-r-[1px] dark:border-gray-500 font-medium outline-none text-gray-600 dark:text-gray-200 dark:bg-dark-mode-background-hover-color cursor-pointer' >
                            <option value={'SOL'}>SOL</option>
                        </select>
                        <input type={'number'} min={1} step={'0.01'}  value={amountCrypto} onChange={(e) => {setAmountCrypto(e.currentTarget.valueAsNumber), setAmountCurrency(e.currentTarget.valueAsNumber * coinPrice)}}  className='rounded-tr-md rounded-br-md outline-transparent dark:bg-dark-mode-background-hover-color focus:outline-violet-500 transition-all ease-in-out duration-200 w-full p-2'/>
                    </div>
                    <div className='w-full flex'>
                        <select className='xl:p-2 landscape:w-24 xl:w-24 rounded-tl-md rounded-bl-md border-r-[1px] dark:border-gray-500 font-medium outline-none text-gray-600 dark:text-gray-200 dark:bg-dark-mode-background-hover-color cursor-pointer' aria-expanded={'false'} value={selectedCurrency} onChange={handleCurrencyChange}>
                            <option value={'usd'}>USD</option>
                            <option value={'cad'}>CAD</option>
                            <option value={'mxn'}>MXN</option>
                            <option value={'eur'}>EUR</option>
                            <option value={'jpy'}>JPY</option>
                        </select>
                        <input type={'number'} min={'1'} step={'.01'} value={amountCurrency}  onChange={(e) => {setAmountCurrency(e.currentTarget.valueAsNumber), setAmountCrypto(e.currentTarget.valueAsNumber / coinPrice)}} className='rounded-tr-md rounded-br-md outline-transparent dark:bg-dark-mode-background-hover-color focus:outline-violet-500 transition-all ease-in-out duration-200 w-full p-2'/>
                    </div>
                    <p className='font-semibold text-gray-700 dark:text-gray-50 '>1 SOL = {coinPrice} {selectedCurrency.toUpperCase()}</p>
                    {isLoading ? 
                        <div className='flex justify-center items-center'>
                            <AiOutlineLoading className='text-gray-700 dark:text-gray-50 h-7 w-7 text-center animate-spin'/>
                        </div>
                    :
                        
                        <button onClick={() => handleDonation(amountCrypto)} className=' bg-violet-500 text-white font-medium p-2 rounded-md cursor-pointer'>Donate</button>
                    }
                    <span className='text-gray-400 dark:text-gray-400 text-sm'>Powered by <a target={'_blank'} href='https://www.coingecko.com/en/coins/solana' className='font-semibold text-violet-400'>CoinGecko</a></span>
                </div>
        </form>
    
        <SnackBar status={transactionStatus?.status} isVisible={showSnackbar} message={transactionStatus?.message} />
    </div>
  )
}

export default DonateForm