import React from 'react'
import NavigationMenu from '../myAccount/NavigationMenu/NavigationMenu'

type Props = {
    children: React.ReactNode,
    selectedOptionMenu?: number,
}

function AccountPageLayout({children}: Props) {
  return (
    <div className='bg-white flex flex-col py-5  dark:bg-dark-mode-background-background w-full  landscape:2xl:p-10 landscape:2xl:flex-row'>
        <NavigationMenu />
        {children}
    </div>
  )
}

export default AccountPageLayout