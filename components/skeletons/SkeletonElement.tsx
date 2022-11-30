import React from 'react'

type Props = {
    type: string
    className?: string
}

function SkeletonElement({type, className}: Props) {
    const classes: string = `skeleton ${type}`
    return (
        <div className={`${classes} ${className} dark:bg-dark-mode-background-hover-color animate-pulse`}>
        </div>
    )
}   

export default SkeletonElement