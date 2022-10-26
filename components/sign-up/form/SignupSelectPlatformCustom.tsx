import React, {useState} from 'react'
import Platforms from '../../../constants/platforms'
import {IoIosArrowDown} from 'react-icons/io'
import { Platform } from '../../../types/forms/PlatformType'
import Image from 'next/image'
type Props = {
    handleChange: CallableFunction;
}

function SignupSelectPlatformCustom({ handleChange}: Props) {
    const platform = new Platforms()
    const [selectedOption, setSelectedOption] = useState<Platform>();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const handleOptionSelect = (idx: number) => {
        setSelectedOption(platform.platforms[idx]);
        handleChange(platform.platforms[idx].name);
    }
    return (
        <div id='custom-select' className='flex justify-between w-full landscape:2xl:w-full items-center relative'>
            <div className={`${openMenu ? 'block' : 'hidden'} bg-transparent h-screen w-screen fixed top-0 left-0 z-10`} onClick={() => setOpenMenu(false)} />
            <p className='font-medium text-gray-800'>Platform:</p>
            <div className='bg-gray-200 border-2 border-transparent focus:border-violet-500 rounded-3xl w-max space-x-5 p-2 flex justify-between items-center cursor-pointer' onClick={() => setOpenMenu(!openMenu)}>
                {selectedOption && 
                    <div className='relative h-7 w-7'>
                        <Image src={selectedOption.logo} layout={'fill'} objectFit='cover' />
                    </div>
                }
                <p className='w-max font-medium text-gray-600 text-ellipsis overflow-hidden truncate'>{selectedOption ? selectedOption.name : 'Select an option please'}</p>
                <IoIosArrowDown className='w-5 h-5 text-gray-800' />
            </div>
            <div id='custom-select-menu' className={`${openMenu ? 'block' : 'hidden'} absolute z-[100] bottom-12 right-0 overflow-scroll h-36 w-max bg-white border-2 border-gray-200  rounded-lg shadow-xl custom-scrollbar overflow-x-hidden`}>
                <ul className='space-y-5 w-56'>
                    {platform.platforms.map((platform, idx) => (
                        <li key={idx} className='flex items-center space-x-5 p-2 hover:bg-gray-100 cursor-pointer' onClick={() => {handleOptionSelect(idx), setOpenMenu(!openMenu)}}>
                            <div className='relative h-5 w-5'>
                                <Image src={platform.logo} layout='fill' objectFit='cover' />
                            </div>
                            <span>{platform.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SignupSelectPlatformCustom