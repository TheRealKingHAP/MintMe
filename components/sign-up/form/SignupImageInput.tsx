import Image from 'next/image'
import React, { useCallback, useState } from 'react'

type Props = {
    handleChange?: CallableFunction,
    username?: string,
    image: string,
    className?: string,
    imgStyle?: string
}

function SignupImageInput({handleChange, username, image, className, imgStyle}: Props) {
    const imgInput = React.useRef<HTMLInputElement>(null);
    const handleImageChange = useCallback (async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file: File = e.target.files[0]
            const base64: string = await convertImgToBase64(file)
            handleChange ? handleChange(base64) : null;
        }
    }, [])
    const convertImgToBase64 = (file: File) => {
        return new Promise<string> ((resolve, reject) => {
            const fileReader = new FileReader();
            if(!file) {
                alert('Please select a valid image')
            } else {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result ? fileReader.result.toString() : '')
                }
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const handleClick = () => {
        if(imgInput.current) {
            imgInput.current.click();
        }
        return
    }
    return (
        <div className='text-center'>
            <div className={`relative ${className ? className : ' h-36 w-36 rounded-full'}`}>
                {image ? <Image src={image} layout='fill' objectFit='cover' className={`${imgStyle ? imgStyle : 'rounded-full'}`}/>
                :
                <div className={`h-full w-full bg-gray-400 dark:bg-dark-mode-background-card-color ${imgStyle ? imgStyle : 'rounded-full'}`}>
                </div>
                }
                <button onClick={handleClick} type='button' className='bg-gray-500 dark:bg-dark-mode-background-hover-color dark:hover:bg-dark-mode-background-500 hover:bg-gray-600 bg-opacity-50 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 rounded-3xl w-28 h-8 text-white font-medium text-sm'>{image ? 'Change' : 'Upload'} image</button>
                <input ref={imgInput} accept='image/png, image/jpeg' multiple={false} type={'file'} onChange={(e) => handleImageChange(e)} className='hidden'></input>
            </div>
            <p className='font-semibold mt-5 text-gray-700 dark:text-gray-50'>{username ? username : ''}</p>
        </div>
    )
}

export default SignupImageInput