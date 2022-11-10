import React, {useState} from 'react'
import Countries from '../../../constants/countries'
import { Country } from '../../../types/forms/CountryType'
import CustomSelect from './Select/CustomSelect'
import CustomSelectOption from './Select/CustomSelectOption'

type Props = {
    handleChange?: CallableFunction,
    value?: Country
}

function SignupSelectCountry({handleChange, value}: Props) {
    const countries = new Countries();
    const handleSelected = (value: Country) => {
        if(handleChange) {
            handleChange(value)
        }
        return
    }
    return (
        <CustomSelect title='Country' selectedOption={value?.name} >
            {countries.countries.map((country, idx) => (
                <CustomSelectOption text={country.name} key={idx} handleClick={() => handleSelected(country)} />
            ))}
        </CustomSelect>
    )
}

export default SignupSelectCountry