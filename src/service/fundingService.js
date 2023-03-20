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

export const getHistoryTransfer = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryTransfer', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryWidthdraw = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryWidthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getHistoryDeposit = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryDeposit', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}