export const timestamp = (time) => {
    'worklet'
    const date = new Date(time * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return `${year}-${month}-${day} ${hour}:${minute}`
}

export const timeHM = (time) => {
    const date = new Date(Number(time) * 1000)
    const hour = date.getHours()
    const minute = date.getMinutes()

    return `${hour}:${minute < 10 ? '0' + minute : minute}`
}

export const timestampCrypto = (time) => {
    const date = new Date(time * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month}-${day}`
}

export const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month}-${day}`
}

export const getPreviousDay = (date = new Date()) => {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    const previousDate = `${previous.getDate()}/${previous.getMonth() + 1}/${previous.getFullYear()}`

    return previousDate;
}

export function convertDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const second = date.getSeconds()
    const ampm = hour % 12 === 0 ? 'AM' : 'PM';

    return `${month}/${day}/${year}, ${hour}:${minutes}:${second} ${ampm}`;
}

export const dateDMY = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day}/${month}/${year}`;
}