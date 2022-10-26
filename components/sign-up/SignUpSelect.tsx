import React from 'react'
import Countries from '../../constants/countries'

type Props = {
    title: string;
    value: string;
    options?: React.ReactElement<HTMLOptionElement>[];
    handleChange: CallableFunction;
}

function SignUpSelect({value, handleChange, title, options}: Props) {
    return (
        <div className='flex justify-between items-center w-full'>
            <label className='text-gray-800 font-medium'>{title}: </label>
            <select value={value} onChange={(e) => handleChange(e.target.value)} className={'w-1/2 border-[1px] border-transparent rounded-3xl p-2 outline-none focus:border-violet-500 text-ellipsis'} aria-expanded={'false'}>
                <option>Choose a {title.toLowerCase()}</option>
                {options && options}
            </select>
        </div>
    )
}

export default SignUpSelect