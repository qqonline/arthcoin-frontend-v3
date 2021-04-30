export const NumberInputRegex = /^\d+(\.\d+)?$/;

export const ValidateNumber = (val: string) => {
    return NumberInputRegex.test(val)
}