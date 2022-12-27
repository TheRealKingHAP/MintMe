import Link from 'next/link'
import React, { ReactNode } from 'react'
import { IconType } from 'react-icons/lib'

type Props = {
    title: string,
    icon?: React.ReactElement<IconType>,
    path: string,
    selected?: boolean,
    className?: string
}

function MenuItem({title, icon, path, className, selected}: Props) {
  return (
    <Link href={path}>
      <a className={`flex items-center justify-between ${selected ? 'bg-dark-mode-background-hover-color' : 'bg-transparent'}   hover:bg-dark-mode-background-hover-color rounded-md p-2 ${className}`}>
        {icon ? icon : null}
        <span>{title}</span>
      </a>
    </Link>
  )
}

export default MenuItem