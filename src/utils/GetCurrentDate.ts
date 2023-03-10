type params = {
    format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'TIMESTAMP'
}
export default function GetCurrentDate({format}: params){
    const date = new Date();
    const year = date.getUTCFullYear();
    let day: number | string = date.getUTCDate();
    let month: number | string = date.getUTCMonth() + 1;

    if( day < 10) day = '0'+ day;
    if( month < 10) month = '0'+ month;

    switch(format){
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`
        case 'TIMESTAMP':
            return date.toString()
        default:
            return date.toString()
    }
}