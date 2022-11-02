interface FormatterProps {
    value: number,
    notation?: 'compact' | 'standard' | 'scientific' | 'engineering',
    currency?: 'USD' | 'MXN' | 'CAD' | 'JPY' | 'EUR',
    style?: 'currency' | 'unit',

}
export default function FormatInt({value, notation, currency, style}: FormatterProps) {
    const formatter = Intl.NumberFormat('en', {
        notation: notation ? notation : 'standard',
        style: style ? style : 'currency',
        currency: currency ? currency : 'USD'
    })
    let n = formatter.format(value);
    return n
}