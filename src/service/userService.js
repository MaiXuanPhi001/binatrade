import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import axiosUpload from "./axiosUpload"
import { fetchPOST } from "./fetchConfig"

export const login = async (data) => {
    try {
        const res = await axiosInstance.post('/api/user/login', data)
        console.log(res)
        return callSuccess(res)
    } catch (error) {
        console.log(error)
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
        const res = await axiosInstance.post('/api/user/changePassword', data)
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

export const uploadAvatar = async (fromData) => {
    try {
        const res = await axiosUpload.post('/api/user/uploadAvatar', fromData)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const checKYCUser = async () => {
    try {
        const res = await axiosInstance.post('/api/user/checkKycUser', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const kycUser = async (formData) => {
    try {
        const res = await axiosInstance.post('/api/user/kycUser', formData)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const generateOTPToken = async () => {
    try {
        const res = await axiosInstance.post('/api/user/generateOTPToken', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const checkUser2fa = async (email) => {
    try {
        const res = await axiosInstance.post('/api/user/checkuser2fa', { email })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getValueConfig = async (name) => {
    try {
        const res = await axiosInstance.post('/api/user/getValueConfig', { name })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}