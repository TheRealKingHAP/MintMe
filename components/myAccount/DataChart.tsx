import React from 'react'
import FormatInt from '../../src/utils/FormatInt'

type DataChartType = {
    qty: number,
    title: string,
    description?:string,
    className?: string
}

function DataChart({qty, title, description, className}: DataChartType) {
  return (
    <div className='bg-gray-100 text-center dark:bg-dark-mode-background-card-color w-max h-max p-5 rounded-xl'>
        <label className='font-bold text-gray-700 dark:text-dark-primary'>{title}</label>
        {description ? 
            <p className='font-light text-gray-500 dark:text-dark-secondary'>{description}</p>
        :
        null
        }
        <div className='mt-2'>
            <p className='text-violet-500 font-semibold text-lg'>{FormatInt({value:qty, currency:'USD', maximumFractionDigits: 2, style:'currency'})}</p>
        </div>
    </div>
  )
}

export default DataChart