import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

export const getCommission = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getCommission', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const historyTransferCommission = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/historyTransferCommission', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}