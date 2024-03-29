import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { CustomSelectOption } from '../../../../types/forms/select/CustomSelectOptionType'

type Props = {
    title?: string,
    selectedOption?: string,
    className?: string,
    openMode?: 'UP' | 'DOWN'
    icon?: string
    children?: React.ReactElement<CustomSelectOption> | React.ReactElement<CustomSelectOption>[]
    handleChange?: CallableFunction
}

function CustomSelect({children, openMode ,handleChange, className, title, icon, selectedOption}: Props) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleOptionSelect = (idx: number) => {
      
  }
  useEffect(()=>{
    if(handleChange){
      handleChange(selectedOption)
    }
    setOpenMenu(false)
  },[selectedOption])
  return (
    <div id='custom-select' className={`flex ${title ? 'justify-between' : 'justify-center'} w-full items-center relative ${className}`}>
      <div className={`${openMenu ? 'block' : 'hidden'} bg-transparent h-screen w-screen fixed top-0 left-0 z-10`} onClick={() => setOpenMenu(false)} />
      {title ? 
        <p className='font-medium text-gray-800 dark:text-white'>{title}:</p>
        :
        null
      }
      <div className='bg-gray-200 dark:bg-dark-mode-background-card-color dark:hover:bg-dark-mode-background-hover-color hover:bg-gray-300 border-2 border-transparent focus:border-violet-500 rounded-3xl w-3/4 space-x-5 p-2 flex justify-between items-center cursor-pointer' onClick={() => setOpenMenu(!openMenu)}>
          {icon && 
              <div className='relative h-7 w-7'>
                  <Image src={icon} layout={'fill'} objectFit='cover' />
              </div>
          }
          <p className='w-max font-medium text-gray-500 dark:text-gray-200 text-ellipsis overflow-hidden truncate'>{selectedOption ? selectedOption : 'Select an option please'}</p>
          <IoIosArrowDown className='w-5 h-5 text-gray-500 dark:text-gray-200' />
      </div>
      <div id='custom-select-menu' className={`${openMenu ? 'h-36 2xl:h-65 border-2' : 'h-0 overflow-hidden border-0'} absolute z-[100] ${(openMode === 'DOWN' ? 'top-12 left-1/2 -translate-x-1/2' : 'bottom-12 right-0')} w-max bg-white dark:bg-dark-mode-background-hover-color border-2 border-gray-200 dark:border-transparent  rounded-lg shadow-xl custom-scrollbar overflow-x-hidden transition-all ease-in duration-75`}>
          <ul className='space-y-5 w-56'>
              {children}
          </ul>
      </div>
    </div>
  )
}

export default CustomSelect