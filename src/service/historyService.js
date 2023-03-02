import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

export const getDayHistoryOrder = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/dayHistoryOrder', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getWeekHistoryOrder = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/weekHistoryOrder', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getDayHistoryOrderAdmin = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/dayHistoryOrderAdmin', data)
        return callSuccess(res)
    } catch (error) {
        console.log('error: ', error)
        return callFailed()
    }
}

export const getWeekHistoryOrderAdmin = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/weekHistoryOrderAdmin', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const historyWidthdraw = async (data) => {
    try {
        const res = await axiosInstance.post('/api/crypto/getHistoryWidthdraw', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}