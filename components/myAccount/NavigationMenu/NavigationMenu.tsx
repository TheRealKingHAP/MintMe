import React from 'react'
import MenuItem from './MenuItem'
import CustomSelect from '../../sign-up/form/Select/CustomSelect'
import CustomSelectOption from '../../sign-up/form/Select/CustomSelectOption'
import { useRouter } from 'next/router'

type Props = {
}
type MenuLinks = {
  title: string,
  path: string
}
function NavigationMenu({}: Props) {
  const menuLinks: MenuLinks[] = [
    {title: 'Overview', path:'/my_account/overview'},
    {title: 'Edit profile', path: '/my_account/profile'}
  ]
  const router = useRouter()
  const handleMenuClick = (route: string) => {
    router.push(route)
  }
  const getCurrentPath = () => {
    const path = router.pathname
    const currentPath: MenuLinks = menuLinks.find((link) => link.path == path) as MenuLinks
    return currentPath
  }
  return (
    <div>
      <div className='w-36 h-max p-5 rounded-lg dark:bg-dark-mode-background-card-color hidden landscape:2xl:block'>
          <ul className='font-semibold space-y-5'>
              {menuLinks.map((item, idx) => (
                <MenuItem key={idx}  path={item.path} title={item.title}/>
              ))}
          </ul>
      </div>
      <CustomSelect className='2xl:landscape:hidden' openMode='DOWN' selectedOption={getCurrentPath().title}>
        {menuLinks.map((item, idx) => (
          <CustomSelectOption key={idx} text={item.title} handleClick={(value: string) => handleMenuClick(item.path)} />
        ))}
      </CustomSelect>
    </div>
  )
}

export default NavigationMenu


