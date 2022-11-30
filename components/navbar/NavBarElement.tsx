import Link from 'next/link'
import React from 'react'
import { NavElementType } from '../../types/navbar/NavElementType'

function NavBarElement({Icon, onClickFunction, label, className}: NavElementType) {
  return (
    <div className={`flex space-x-2 justify-start landspace:2xl:justify-center items-center cursor-pointer ${className}`} onClick={onClickFunction}>
      {Icon && <Icon  className='h-7 w-7 text-gray-500 hover:text-gray-900 '/>}
      <p>{label}</p>
    </div>


  )
}

export default NavBarElement