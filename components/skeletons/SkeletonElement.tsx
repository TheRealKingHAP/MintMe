import React from 'react'

type Props = {
    type: string
    className?: string
}

function SkeletonElement({type, className}: Props) {
    const classes: string = `skeleton ${type}`
    return (
        <div className={`${classes} ${className} animate-pulse`}>
        </div>
    )
}   

export default SkeletonElement