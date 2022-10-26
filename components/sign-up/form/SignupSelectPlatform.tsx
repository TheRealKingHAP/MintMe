import React, { useState } from 'react'
import Platforms from '../../../constants/platforms'
import { Platform } from '../../../types/forms/PlatformType'
import CustomSelect from './Select/CustomSelect'
import CustomSelectOption from './Select/CustomSelectOption'

type Props = {
    handleChange: CallableFunction
}

function SignupSelectPlatform({handleChange}: Props) {
    const platform = new Platforms()
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>()
    return (
        <CustomSelect title='Platform' selectedOption={selectedPlatform?.name} icon={selectedPlatform?.logo} handleChange={(value: string) => handleChange(value)}>
            {platform.platforms.map((platform, idx) => (
                <CustomSelectOption text={platform.name} img={platform.logo} key={idx} handleClick={(value: string) => setSelectedPlatform(platform)}/>
            ))}
        </CustomSelect>
    )
}

export default SignupSelectPlatform