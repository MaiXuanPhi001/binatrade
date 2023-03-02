import { getDayHistoryOrderThunk, getWeekHistoryOrderThunk } from "@asyncThunk/historyAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const historySlice = createSlice({
    name: 'history',
    initialState: {
        loading: false,
        day: 'Today',
        page: 1,
        total: 0,
        historyOrder: [],
    },
    reducers: {},
    extraReducers: buidler => {
        buidler.
            addCase(getWeekHistoryOrderThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getDayHistoryOrderThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getDayHistoryOrderThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.day = 'Today'
                    state.page = action.payload.page
                    state.total = action.payload.data.total
                    state.historyOrder = action.payload.data.array
                }
            }).
            addCase(getWeekHistoryOrderThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.day = 'This week'
                    state.page = action.payload.page
                    state.total = action.payload.data.total
                    state.historyOrder = action.payload.data.array
                }
            })
    }
})

export default historySlice