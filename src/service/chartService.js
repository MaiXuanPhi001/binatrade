import { callFailed, callSuccess } from "@method/requestResult"
import axiosInstance from "./axios"

export const getChart = async (symbol) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getChart', { symbol })
        return callSuccess(res)
    } catch (error) {
        return callFailed()
    }
}