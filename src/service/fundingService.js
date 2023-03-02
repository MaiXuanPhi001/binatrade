import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"
import { fetchPOST, fetchUploadImg } from "./fetchConfig"

export const createWallet = async (data) => {
    try {
        const res = await axiosInstance.post('/api/user/createWallet', { symbol: data.symbol })
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

export const checkKYCUser = async (email) => {
    try {
        const res = await axiosInstance.post('/api/user/generateOTPToken', { email: email })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryTransfer = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryTransfer', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const checkDepositVND = async () => {
    try {
        const response = await fetchPOST('/api/depositVND/checkTransactionDepositVnd', {})
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getBanking = async () => {
    try {
        const res = await axiosInstance.post('/api/depositVND/getBanking', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const createDepositVnd = async (data) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/createDepositVND', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const verifyTransactionDepositVnd = async (data) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/verifyTransactionDepositVnd', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const cancelTransactionDepositVnd = async (data) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/cancelTransactionDepositVnd', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const uploadImageDeposiVND = async (formData) => {
    try {
        const response = await fetchUploadImg('/api/depositVND/uploadImageDeposiVND', formData)
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const historyDepositVND = async (data) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/historyDepositVnd', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getBankingUser = async () => {
    try {
        const response = await fetchPOST('/api/depositVND/getBankingUser', {})
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getPriceVNDtoUSD = async () => {
    try {
        const res = await axiosInstance.post('/api/user/getValueConfig', { name: "USD" })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const userAddBankingWithdraw = async (data) => {
    try {
        const response = await fetchPOST('/api/depositVND/addListBanking', data)
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const updateBankingUser = async (data) => {
    try {
        const response = await fetchPOST('/api/depositVND/updateBankingUser', data)
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const withdrawVND = async (data) => {
    try {
        const response = await fetchPOST('/api/depositVND/widthdrawVND', data)
        const res = await response.json()
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryWidthdraw = async (data) => {
    try {
        const res = await axiosInstance.post('/api/depositVND/getHistoryWidthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}