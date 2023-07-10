import { createAsyncThunk } from "@reduxjs/toolkit"
import { dayHistoryOrder, getChartStatisticsUser, getHistoryCommissionToTime, getListStreak, getParentList, getPrizePoolUser } from "@service/fundingService"

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

export const getHistoryCommissionToTimeThunk =
    createAsyncThunk('funding/getHistoryCommissionToTime', async (data) => {
        const res = await getHistoryCommissionToTime(data)
        return { ...res, page: data.page }
    })

export const getParentListThunk =
    createAsyncThunk('funding/getParentList', async (userid) => {
        const res = await getParentList(userid)
        return res
    })