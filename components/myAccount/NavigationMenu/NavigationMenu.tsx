import Link from 'next/link'
import React, { useState } from 'react'
import MenuItem from './MenuItem'
import CustomSelect from '../../sign-up/form/Select/CustomSelect'
import CustomSelectOption from '../../sign-up/form/Select/CustomSelectOption'
import { useRouter } from 'next/router'
import { Url } from 'url'

type Props = {
  selectedOptionIDX?: number
}
type MenuLinks = {
  title: string,
  path: string
}
function NavigationMenu({selectedOptionIDX}: Props) {
  const menuLinks: MenuLinks[] = [
    {title: 'Account', path:'/my_account'},
    {title: 'Edit profile', path: '/my_account/profile'}
  ]
  const router = useRouter()
  const handleMenuClick = (route: string) => {
    router.push(route)
  }
  return (
    <div>
      <div className='w-36 h-max p-5 rounded-lg dark:bg-dark-mode-background-card-color hidden landscape:2xl:block'>
          <ul className='font-semibold space-y-5'>
              {menuLinks.map((item, idx) => (
                <MenuItem key={idx}  path={item.path} title={item.title} selected={selectedOptionIDX == idx ? true: false}/>
              ))}
          </ul>
      </div>
      <CustomSelect className='2xl:landscape:hidden' openMode='DOWN' selectedOption={menuLinks[selectedOptionIDX || 0].title}>
        {menuLinks.map((item, idx) => (
          <CustomSelectOption key={idx} text={item.title} handleClick={(value: string) => handleMenuClick(item.path)} />
        ))}
      </CustomSelect>
    </div>
  )
}

export default NavigationMenu


