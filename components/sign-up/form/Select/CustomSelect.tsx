import Image from 'next/image'
import React, {useState, useEffect} from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { CustomSelectOption } from '../../../../types/forms/select/CustomSelectOptionType'

type Props = {
    title?: string,
    selectedOption?: string,
    className?: string
    icon?: string
    children?: React.ReactElement<CustomSelectOption> | React.ReactElement<CustomSelectOption>[]
    handleChange?: CallableFunction;
}

function CustomSelect({children, handleChange, className, title, icon, selectedOption}: Props) {
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
    <div id='custom-select' className={`flex justify-between w-full items-center relative ${className}`}>
      <div className={`${openMenu ? 'block' : 'hidden'} bg-transparent h-screen w-screen fixed top-0 left-0 z-10`} onClick={() => setOpenMenu(false)} />
      <p className='font-medium text-gray-800'>{title}:</p>
      <div className='bg-gray-200 border-2 border-transparent focus:border-violet-500 rounded-3xl w-3/4 space-x-5 p-2 flex justify-between items-center cursor-pointer' onClick={() => setOpenMenu(!openMenu)}>
          {icon && 
              <div className='relative h-7 w-7'>
                  <Image src={icon} layout={'fill'} objectFit='cover' />
              </div>
          }
          <p className='w-max font-medium text-gray-600 text-ellipsis overflow-hidden truncate'>{selectedOption ? selectedOption : 'Select an option please'}</p>
          <IoIosArrowDown className='w-5 h-5 text-gray-800' />
      </div>
      <div id='custom-select-menu' className={`${openMenu ? 'h-36 2xl:h-65 border-2' : 'h-0 overflow-hidden border-0'} absolute z-[100] bottom-12 right-0 w-max bg-white border-2 border-gray-200  rounded-lg shadow-xl custom-scrollbar overflow-x-hidden transition-all ease-in duration-75`}>
          <ul className='space-y-5 w-56'>
              {children}
          </ul>
      </div>
    </div>
  )
}

export default CustomSelect