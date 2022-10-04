import React, { useState } from 'react'
import { Donation } from '../../../../types/users/userPage/donation/DonationType'
import DonationTile from './DonationTile'

function DonationBlock({donations}: {donations: Donation[]}) {
  const [orderBy, setOrderBy] = useState('amount');
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setOrderBy(event.currentTarget.value);
  } 
  const orderedList: Donation[] = donations?.sort((a: Donation, b: Donation) => {
    if(orderBy == 'amount_lowest'){
      return a['amount' as keyof Donation] > b['amount' as keyof Donation] ? 1 : -1
    }
    if(orderBy == 'date_oldest'){
      return a['date' as keyof Donation] > b['date' as keyof Donation] ? 1 : -1
    }
    return a[orderBy as keyof Donation] > b[orderBy as keyof Donation] ? -1 : 1
  })
  return (
    <div className='flex flex-col h-[30rem] border-2 rounded-md border-gray-200 p-5  space-y-5'>
        <div className='flex items-center justify-between space-x-5'>
        <p className='font-bold text-gray-700 text-base lg:text-lg xl:text-xl 2xl:text-2xl'>Donations</p>
        <form className='flex'>
          <label className='font-semibold text-gray-600 hidden lg:block'>Order by:</label>
          <select value={orderBy} onChange={handleChange} className='w-max lg:ml-2 border-green-300 border-2 rounded-lg outline-none' >
            <option value={'amount'}>Highest donation</option>
            <option value={'amount_lowest'}>Lowest donation</option>
            <option value="date">Date (newest)</option>
            <option value="date_oldest">Date (oldest)</option>
          </select>
        </form>
        </div>
        <div id='DonationListScroll' className='overflow-scroll overflow-x-hidden md:pr-2 space-y-5'>
          
        { donations && donations.length > 0 ? donations.map((donation, index) => (
            <DonationTile id={donation.id} sender={donation.sender} receiver={donation.receiver} amount={donation.amount} date={donation.date} key={index}/>
        ))
        :
        <p className='font-semibold text-gray-700 text-base lg:text-lg xl:text-xl'>No donations</p>
        }
        </div>
    </div>
  )
}

export default DonationBlock