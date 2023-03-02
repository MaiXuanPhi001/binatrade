import { getDayOrderStatisticOrderThunk, getWeekStatisticsOrderThunk } from "@asyncThunk/statisticAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const statisticSlice = createSlice({
    name: 'statistic',
    initialState: {
        loading: false,
        day: 'Today',
        statisticsOrder: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(getDayOrderStatisticOrderThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getWeekStatisticsOrderThunk.pending, (state, action) => {
                state.loading = true
            }).
            addCase(getDayOrderStatisticOrderThunk.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.error && action.payload.status) {
                    state.statisticsOrder = action.payload.data
                    state.day = 'Today'
                }
            }).
            addCase(getWeekStatisticsOrderThunk.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.error && action.payload.status) {
                    state.statisticsOrder = action.payload.data
                    state.day = 'This week'
                }
            })
    }
})

export default statisticSlice