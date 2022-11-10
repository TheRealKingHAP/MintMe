import React from 'react'

type Props = {
  className?: string
}

function LoaderComponent({className}: Props) {
  return (
    <div className={`loader-component ${className}`}>
        <ul className='loader-element-container'>
            <li className='loader-element'></li>
            <li className='loader-element'></li>
            <li className='loader-element'></li>
        </ul>
    </div>
  )
}

export default LoaderComponent