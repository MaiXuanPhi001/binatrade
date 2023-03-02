import { getCommissionThunk, historyTransferCommissionThunk } from "@asyncThunk/commissionThunk";

const { createSlice } = require("@reduxjs/toolkit");

const commissionSlice = createSlice({
    name: 'commission',
    initialState: {
        commission: {
            loading: false,
            total: 0,
            page: 1,
            data: [],
        },
        transfer: {
            loading: false,
            total: 0,
            page: 1,
            data: [],
        },
    },
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(getCommissionThunk.pending, (state) => {
                state.commission.loading = true
            }).
            addCase(historyTransferCommissionThunk.pending, (state) => {
                state.transfer.loading = true
            }).
            addCase(getCommissionThunk.fulfilled, (state, action) => {
                state.commission.loading = false
                if (action.payload.status) {
                    state.commission.data = action.payload.data.array
                    state.commission.total = action.payload.data.total
                    state.commission.page = action.payload.page
                }
            }).
            addCase(historyTransferCommissionThunk.fulfilled, (state, action) => {
                state.transfer.loading = false
                if (action.payload.status) {
                    state.transfer.data = action.payload.data.array
                    state.transfer.total = action.payload.data.total
                    state.transfer.page = action.payload.page
                }
            })
    }
})

export default commissionSlice