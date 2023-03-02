import {
    getDayHistoryOrder,
    getDayHistoryOrderAdmin,
    getWeekHistoryOrder,
    getWeekHistoryOrderAdmin
} from "@service/historyService";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const getDayHistoryOrderThunk = createAsyncThunk('history/getDayHistoryOrder', async (data) => {
    const res = await getDayHistoryOrder(data)
    return { ...res, page: data.page }
})

export const getWeekHistoryOrderThunk = createAsyncThunk('history/getWeekHistoryOrder', async (data) => {
    const res = await getWeekHistoryOrder(data)
    return { ...res, page: data.page }
})

export const getDayHistoryOrderAdminThunk = createAsyncThunk('admin/getDayHistoryOrderAdmin', async (data) => {
    const res = await getDayHistoryOrderAdmin(data)
    return { ...res, page: data.page }
})

export const getWeekHistoryOrderAdminThunk = createAsyncThunk('admin/getWeekHistoryOrderAdmin', async (data) => {
    const res = await getWeekHistoryOrderAdmin(data)
    return { ...res, page: data.page }
})
