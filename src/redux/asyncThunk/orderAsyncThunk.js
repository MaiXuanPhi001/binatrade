import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrderPendingUser, order } from "@service/orderService";

export const orderThunk = createAsyncThunk('order/order', async (data) => {
    const res = await order(data)
    if (!res.error && res.status) {
        return { ...res, type: data.type }
    }
    return res
})

export const getAllOrderPendingUserThunk =
    createAsyncThunk('order/getAllOrderPendingUser', async (type) => {
        const res = await getAllOrderPendingUser(type)
        return { ...res, type: type }
    })
