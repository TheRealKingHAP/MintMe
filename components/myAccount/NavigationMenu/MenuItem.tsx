import Link from 'next/link'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  return (
    <Link href={path} passHref>
      <a className={`flex items-center justify-between ${router.pathname == path ? 'bg-gray-200 dark:bg-dark-mode-background-hover-color' : ''}   hover:bg-gray-200 dark:hover:bg-dark-mode-background-hover-color rounded-md p-2 ${className}`}>
        {icon ? icon : null}
        <span>{title}</span>
      </a>
    </Link>
  )
}

export default MenuItem