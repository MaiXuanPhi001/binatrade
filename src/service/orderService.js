import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

export const order = async (data) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/order', data)
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}

export const getAllOrderPendingUser = async (type) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getAllOrderPendingUser', { type })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}