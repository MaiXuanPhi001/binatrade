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

export const getAllOrderPendingUser = async () => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getAllOrderPendingUser', { type: 'live' })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}