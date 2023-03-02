import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrderPendingUser, order } from "@service/orderService";

export const orderThunk = createAsyncThunk('order/order', async (data) => {
    const res = await order(data)
    if (!res.error && res.status) {
        return { ...res, amount: data.amount, symbol: data.symbol, side: data.side }
    }
    return res
})

export const getAllOrderPendingUserThunk = createAsyncThunk('order/getAllOrderPendingUser', async () => {
    const res = await getAllOrderPendingUser()
    return res
})
