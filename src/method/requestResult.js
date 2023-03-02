export const callSuccess = (res) => {
    return { ...res, error: false }
}

export const callFailed = () => {
    return { error: true, status: false, message: "Cannot connect to server! please try again" }
}