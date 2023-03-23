import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import { fetchPOST } from "./fetchConfig"

export const login = async (data) => {
    try {
        const res = await axiosInstance.post('/api/user/login', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getProfile = async () => {
    try {
        const res = await axiosInstance.post('/api/user/getProfile', {})
        return res
    } catch (error) {
        return callFailed()
    }
}

export const changePassword = async (data) => {
    try {
        const response = await fetchPOST('/api/user/changePassword', data)
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getListUserF1 = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getListUserF1', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getParentToLevel = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getParentToLevel', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const turn2FA = async (otp) => {
    try {
        const response = await fetchPOST('/api/user/turn2FA', { otp })
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const signUp = async (data) => {
    try {
        const res = await axiosInstance.post('/api/user/signup', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const sendMailForgotPassword = async (email) => {
    try {
        const res = await axiosInstance.post('/api/user/sendmailforgetpassword', { email })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}


export const updateBalanceDemo = async () => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/updateBalanceDemo', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

// data {
//     userid: 283
//     image: (binary)
// }
export const uploadAvatar = async (data) => {
    try {
        const res = await axiosInstance.post('/api/user/uploadAvatar', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}