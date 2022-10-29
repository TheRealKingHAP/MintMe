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
    <textarea cols={cols} rows={row} value={inputValue} placeholder={title} onChange={(e) => handleChange(e.target.value)} className={` ${className} `}></textarea>
  )
}

export default SignupTextAreaInput