import { dayHistoryOrderThunk, getHistoryCommissionToTimeThunk, getListStreakThunk, getParentListThunk, getPrizePoolUserThunk, weekHistoryOrderThunk } from "@asyncThunk/fundingAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const fundingSlice = createSlice({
    name: 'funding',
    initialState: {
        winningHistory: {
            data: [],
            loading: false,
            page: 1,
            total: 0,
        },
        yourHistory: {
            data: [],
            loading: false,
            page: 1,
            total: 0,
        },
        dayWeekHistoryOrder: {
            data: [],
            loading: false,
            page: 1,
            total: 0,
        },
        historyCommission: {
            data: [],
            loading: false,
            page: 1,
            total: 0,
            timeStart: '',
            timeEnd: '',
        },
        parentList: {
            data: [],
            dataFilter: [],
            fieldTotal: 'totalOrder',
            fieldCommission: 'totalCommission',
            filterName: '',
            level: 1,
        },
    },
    reducers: {
        setHistoryCommission: (state, { payload }) => {
            state.historyCommission = payload
        },
        setParentList: (state, { payload }) => {
            state.parentList = payload
        },
        searchParentList: (state) => {
            state.parentList.dataFilter = state.parentList.data.filter(
                item => item.level === state.parentList.level
            )
            state.parentList.dataFilter = state.parentList.dataFilter.filter(
                item => item.userName.toLowerCase().includes(state.parentList.filterName.toLowerCase())
            )
        }
    },
    extraReducers: buidlder => {
        buidlder
            .addCase(getListStreakThunk.pending, (state) => {
                state.winningHistory.loading = true
            })
            .addCase(getListStreakThunk.fulfilled, (state, { payload }) => {
                state.winningHistory.loading = false
                if (payload.status) {
                    state.winningHistory.data = payload.data.array
                    state.winningHistory.page = payload.page
                    state.winningHistory.total = payload.data.total
                }
            })
            .addCase(getPrizePoolUserThunk.pending, (state) => {
                state.yourHistory.loading = true
            })
            .addCase(getPrizePoolUserThunk.fulfilled, (state, { payload }) => {
                state.yourHistory.loading = false
                if (payload.status) {
                    state.yourHistory.data = payload.data.array
                    state.yourHistory.page = payload.page
                    state.yourHistory.total = payload.data.total
                }
            })
            .addCase(dayHistoryOrderThunk.pending, (state, { payload }) => {
                state.dayWeekHistoryOrder.loading = true
            })
            .addCase(dayHistoryOrderThunk.fulfilled, (state, { payload }) => {
                state.dayWeekHistoryOrder.loading = false
                if (payload.status) {
                    state.dayWeekHistoryOrder.data = payload.data.array
                    state.dayWeekHistoryOrder.page = payload.page
                    state.dayWeekHistoryOrder.total = payload.data.total
                }
            })
            .addCase(weekHistoryOrderThunk.fulfilled, (state, { payload }) => {
                console.log('payload: ', payload)
                state.dayWeekHistoryOrder.loading = false
                if (payload.status) {
                    state.dayWeekHistoryOrder.data = payload.data.array
                    state.dayWeekHistoryOrder.page = payload.page
                    state.dayWeekHistoryOrder.total = payload.data.total
                }
            })
            .addCase(getHistoryCommissionToTimeThunk.fulfilled, (state, { payload }) => {
                state.historyCommission.loading = false
                if (payload.status) {
                    state.historyCommission.data = payload.data.array
                    state.historyCommission.page = payload.page
                    state.historyCommission.total = payload.data.total
                }
            })
            .addCase(getParentListThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.parentList.data = payload.data
                    state.parentList.dataFilter = payload.data
                }
            })
    }
})

export default fundingSlice