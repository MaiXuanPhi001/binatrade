export const kFormatter = (num) => {
    'worklet'
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numberCommasDot = (x) => {
    return x.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + x.toFixed(2).toString().substring(x.toString().indexOf("."))
}

export const converNetwork = (str) => {
    if (str) {
        const dotIndex = str.indexOf('.')
        return str.slice(dotIndex + 1, str.length)
    }
}