import React from 'react'

type InputProps = {
    title?: string,
    inputType?: string,
    inputValue: string
    handleChange: CallableFunction
    className?: string
}

function SignupInput({title, inputType, handleChange, inputValue, className}: InputProps) {
  return (
    <div className='relative w-full'>
        <input type={inputType ? inputType : 'text'} value={inputValue} placeholder={title || 'My Input'} className={`peer outline-none h-10 landscape:2xl:px-2 w-full placeholder-transparent border-b-2 landscape:2xl:border-2 landscape:2xl:rounded-lg border-gray-300 dark:border-transparent focus:border-b-violet-400 landscape:2xl:focus:border-violet-400 bg-white dark:bg-dark-mode-background-card-color ${className} `} onChange={(e) => handleChange(e.target.value)}></input>
        <label className='pointer-events-none absolute left-0 landscape:2xl:left-2 -top-3.5 landscape:2xl:-top-5 text-violet-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-200 peer-placeholder-shown:top-2 peer-focus:text-sm peer-focus:-top-3.5 landscape:2xl:peer-focus:-top-5 peer-focus:text-violet-400 dark:peer-focus:text-violet-400 transition-all duration-150 ease-in-out'>{title ? title : 'My input'}</label>
    </div>
  )
} 

export default SignupInput