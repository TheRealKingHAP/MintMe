
export default function ShortenString(text?: string, maxLenght?: number) {
    if(!text){
        return null
    }
    maxLenght = maxLenght || 5
    var firstString = text.slice(0, maxLenght)
    var lastString = text.slice(text.length - maxLenght, text.length)
    var trimmedString = firstString + '..' + lastString
    return trimmedString
}