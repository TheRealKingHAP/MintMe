import Image from 'next/image'
import React from 'react'
import { CustomSelectOption } from '../../../../types/forms/select/CustomSelectOptionType'

type Props = {
    text: string
    img?: string
    key: number | string
    handleClick?: CallableFunction
}

function CustomSelectOption({text, img, handleClick}:CustomSelectOption) {
    const handleEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (handleClick){
            handleClick(text)
        }
        return
    }
    return (
        <div className='flex items-center space-x-5 p-2 hover:bg-gray-100 dark:hover:bg-dark-mode-background-500 cursor-pointer' onClick={(e) => handleEvent(e)}>
        {img &&
            <div className='relative h-5 w-5'>
                <Image src={img} layout='fill' objectFit='cover' />
            </div>
        }
        <span>{text}</span>
        </div>
    )
}

export default CustomSelectOption