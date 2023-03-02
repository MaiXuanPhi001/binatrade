import { callFailed } from "@method/requestResult"
import axiosInstance from "./axios"

export const getChart = async (symbol) => {
    try {
        const res = await axiosInstance.post('/api/binaryOption/getChart', { symbol })
        return res
    } catch (error) {
        return callFailed()
    }
}