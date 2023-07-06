import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

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

export const withDraw = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/widthdraw', data)
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

export const transfer = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/transfer', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getProfileMegaPoolAfter = async () => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getProfileMegaPoolAfter', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getListStreak = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getListStreak', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getPrizePoolUser = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getPrizePoolUser', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const confirmPrizePoolUser = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/confirmPrizePoolUser', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const dayHistoryOrder = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/dayHistoryOrder', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const buyMemberVip = async () => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/buyMemberVip', {})
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getChartStatisticsUser = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getChartStatisticsUser', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const weekStatisticsOrder = async (type) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/weekStatisticsOrder', { type })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}