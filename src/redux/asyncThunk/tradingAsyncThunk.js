import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllOrderPendingUser, order } from "@service/orderService"
import { getChart } from "@service/tradeService"
import { colors } from "@theme/colors"

export const orderThunk = createAsyncThunk('trading/order', async (data) => {
    const res = await order(data)
    if (!res.error && res.status) {
        return { ...res, type: data.type }
    }
    return res
})

export const getAllOrderPendingUserThunk =
    createAsyncThunk('trading/getAllOrderPendingUser', async (type) => {
        const res = await getAllOrderPendingUser(type)
        return { ...res, type: type }
    })

export const getChartThunk =
    createAsyncThunk('trading/getChartThunk', async (data) => {
        const res = await getChart(data.symbol)
        if (res.status) {
            return {
                ...res, 
                size_chart: data.size_chart, 
                heigh_candle: data.heigh_candle,
                height_svg: data.height_svg,
                paddingTop: data.paddingTop,
                height_volume: data.height_volume,
                gap_candle: data.gap_candle,
            }
        }
        return res
    })