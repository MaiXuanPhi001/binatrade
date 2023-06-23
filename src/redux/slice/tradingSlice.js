import { getChartThunk } from "@asyncThunk/tradingAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const tradingSlice = createSlice({
    name: 'tradingSlice',
    initialState: {
        candles: [],
        maxHighItem: null,
        minLowItem: null,
        heighValueChart: 0,
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getChartThunk.fulfilled, (state, { payload }) => {
                console.log('payload ', payload)
                if (payload.status) {
                    state.candles = payload.candles
                    state.maxHighItem = payload.maxHighItem
                    state.minLowItem = payload.minLowItem
                    state.heighValueChart = payload.heighValueChart
                    // state.dPathMA = payload.dPathMA
                }
            })
    }
})

export default tradingSlice