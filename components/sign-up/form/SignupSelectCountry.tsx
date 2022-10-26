import React, {useState} from 'react'
import Countries from '../../../constants/countries'
import { Country } from '../../../types/forms/CountryType'
import CustomSelect from './Select/CustomSelect'
import CustomSelectOption from './Select/CustomSelectOption'

type Props = {
    handleChange?: CallableFunction
}

function SignupSelectCountry({handleChange}: Props) {
    const countries = new Countries();
    const [selectedCountry, setSelectedCountry] = useState<Country>();
    const handleSelected = (value: string) => {
        if(handleChange) {
            handleChange(value)
        }
        return
    }
    return (
        <CustomSelect title='Country' selectedOption={selectedCountry?.name} handleChange={(value: string) => handleSelected(value)}>
            {countries.countries.map((country, idx) => (
                <CustomSelectOption text={country.name} key={idx} handleClick={() => setSelectedCountry(country)} />
            ))}
        </CustomSelect>
    )
}

export default SignupSelectCountry