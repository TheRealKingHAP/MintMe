import React from 'react'

type Props = {
    title?: string,
    cols?: number,
    row?: number
    inputValue: string
    handleChange: CallableFunction
    className?: string
}

function SignupTextAreaInput({cols, row, inputValue, handleChange, title, className}: Props) {
  return (
    <textarea cols={cols} rows={row} value={inputValue} placeholder={title} onChange={(e) => handleChange(e.target.value)} className={`border-2 border-gray-300 dark:bg-dark-mode-background-card-color dark:border-transparent dark:placeholder:text-gray-200 rounded-3xl p-2 h-28 w-full focus:border-violet-400 outline-none resize-none ${className} `}></textarea>
  )
}

export default SignupTextAreaInput