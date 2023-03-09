import { getDayHistoryOrderAdminThunk, getWeekHistoryOrderAdminThunk } from "@asyncThunk/historyAsyncThunk";
import { getDayStatisticsOrderAdminThunk, getWeekStatisticsOrderAdminThunk } from "@asyncThunk/statisticAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'user',
    initialState: {
        statisticOrder: {
            day: 'Today',
            data: {},
        },
        historyOrder: {
            day: 'Today',
            page: 1,
            data: [],
        },
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.
            addCase(getDayStatisticsOrderAdminThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.statisticOrder.day = 'Today'
                    state.statisticOrder.data = action.payload.data
                }
            }).
            addCase(getWeekStatisticsOrderAdminThunk.fulfilled, (state, action) => {
                if (!action.payload.error && action.payload.status) {
                    state.statisticOrder.data = action.payload.data
                    state.statisticOrder.day = 'This week'
                }
            }).
            addCase(getDayHistoryOrderAdminThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.historyOrder.day = 'Today'
                    state.historyOrder.page = action.payload.page
                    state.historyOrder.total = action.payload.data.total
                    state.historyOrder.data = action.payload.data.array
                }
            }).
            addCase(getWeekHistoryOrderAdminThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.historyOrder.day = 'This week'
                    state.historyOrder.page = action.payload.page
                    state.historyOrder.total = action.payload.data.total
                    state.historyOrder.data = action.payload.data.array
                }
            })
    }
})

export default adminSlice