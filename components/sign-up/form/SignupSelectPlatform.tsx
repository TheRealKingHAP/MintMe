import React, { useState } from 'react'
import Platforms from '../../../constants/platforms'
import { Platform } from '../../../types/forms/PlatformType'
import CustomSelect from './Select/CustomSelect'
import CustomSelectOption from './Select/CustomSelectOption'

type Props = {
    handleChange: CallableFunction,
    value?: Platform,
}

function SignupSelectPlatform({handleChange, value}: Props) {
    const platform = new Platforms()
    return (
        <CustomSelect title='Platform' selectedOption={value?.name} icon={value?.logo}>
            {platform.platforms.map((platform, idx) => (
                <CustomSelectOption text={platform.name} img={platform.logo} key={idx} handleClick={(value: string) => handleChange(platform)}/>
            ))}
        </CustomSelect>
    )
}

export default SignupSelectPlatform