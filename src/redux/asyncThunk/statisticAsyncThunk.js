import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDayOrderStatisticOrder, getDayStatisticsOrderAdmin, getWeekStatisticsOrder, getWeekStatisticsOrderAdmin } from "@service/statisticService";

export const getDayOrderStatisticOrderThunk = createAsyncThunk('statistic/getDayOrderStatisticOrder', async () => {
    const res = await getDayOrderStatisticOrder()
    return res
})

export const getWeekStatisticsOrderThunk = createAsyncThunk('statistic/getWeekStatisticsOrder', async () => {
    const res = await getWeekStatisticsOrder()
    return res
})

export const getDayStatisticsOrderAdminThunk = createAsyncThunk('admin/getDayStatisticsOrderAdmin', async (data) => {
    const res = await getDayStatisticsOrderAdmin(data)
    return res
})

export const getWeekStatisticsOrderAdminThunk = createAsyncThunk('admin/getWeekStatisticsOrderAdmin', async (data) => {
    const res = await getWeekStatisticsOrderAdmin(data)
    return res
})