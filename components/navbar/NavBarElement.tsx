import Link from 'next/link'
import React from 'react'
import { NavElementType } from '../../types/navbar/NavElementType'

function NavBarElement({Icon, onClickFunction}: NavElementType) {
  return (
    <div className='flex flex-col justify-center items-center cursor-pointer' onClick={onClickFunction}>
        <Icon  className='h-7 w-7 text-gray-500 hover:text-gray-900 '/>
    </div>


  )
}

export default NavBarElement