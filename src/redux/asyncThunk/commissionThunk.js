import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCommission, historyTransferCommission } from '@service/commissionService'

export const getCommissionThunk = createAsyncThunk('commission/getCommission', async (data) => {
    const res = await getCommission(data)
    return { ...res, page: data.page }
})

export const historyTransferCommissionThunk = createAsyncThunk('commission/historyTransferCommission', async (data) => {
    const res = await historyTransferCommission(data)
    return { ...res, page: data.page }
})