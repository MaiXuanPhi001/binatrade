import { getListUserF1Thunk, getParentToLevelThunk } from "@asyncThunk/userAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        loading: false,
        loadingF1: false,
        management: {
            total: 0,
            level: 0,
            page: 1,
            data: [],
        },
        userF1: {
            total: 0,
            page: 1,
            data: [],
        },
    },
    reducers: {},
    extraReducers: builder => {
        builder.
            addCase(getListUserF1Thunk.pending, (state) => {
                state.loadingF1 = true
            }).
            addCase(getParentToLevelThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getListUserF1Thunk.fulfilled, (state, action) => {
                state.loadingF1 = false
                if (action.payload.status) {
                    state.userF1.total = action.payload.data.total
                    state.userF1.page = action.payload.page
                    state.userF1.data = action.payload.data.array
                }
            }).
            addCase(getParentToLevelThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.management.total = 0
                    state.management.level = action.payload.level
                    state.management.page = 1
                    state.management.data = action.payload.data
                }
            })
    }
})

export default accountSlice