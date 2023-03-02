import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

export const getDayOrderStatisticOrder = async () => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/dayStatisticsOrder', { type: 'live' })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getWeekStatisticsOrder = async () => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/weekStatisticsOrder', { type: 'live' })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getDayStatisticsOrderAdmin = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/dayStatisticsOrderAdmin', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getWeekStatisticsOrderAdmin = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/weekStatisticsOrderAdmin', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}
