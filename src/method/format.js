export const kFormatter = (num) => {
    'worklet'
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numberCommasDot = (n) => {
    var x1 = (n + "").split(".")[0];
    if (!Number.isInteger(n)) {
        const x2 = (n + "").split(".")[1];
        return x1 + '.' + x2
    } else {
        return x1
    }
}

export const converNetwork = (str) => {
    if (str) {
        const dotIndex = str.indexOf('.')
        return str.slice(dotIndex + 1, str.length)
    }
}