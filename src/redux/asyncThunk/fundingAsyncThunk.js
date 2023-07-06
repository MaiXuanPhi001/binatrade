import { createAsyncThunk } from "@reduxjs/toolkit"
import { dayHistoryOrder, getListStreak, getPrizePoolUser } from "@service/fundingService"

export const getListStreakThunk =
    createAsyncThunk('funding/getListStreak', async (data) => {
        const res = await getListStreak(data)
        return { ...res, page: data.page }
    })

export const getPrizePoolUserThunk =
    createAsyncThunk('funding/getPrizePoolUser', async (data) => {
        const res = await getPrizePoolUser(data)
        return { ...res, page: data.page }
    })

export const dayHistoryOrderThunk =
    createAsyncThunk('funding/dayHistoryOrder', async (data) => {
        const res = await dayHistoryOrder(data)
        return { ...res, page: data.page }
    })