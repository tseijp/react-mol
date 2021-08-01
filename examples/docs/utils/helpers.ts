export function range (length=0) {
    const result = new Array(length)
    while (length--) result[length] = length
    return result
}
