import { getListStreakThunk } from "@asyncThunk/fundingAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const fundingSlice = createSlice({
    name: 'funding',
    initialState: {
        winningHistory: {
            data: [],
            loading: false,
            page: 1,
            total: 0,
        }
    },
    reducers: {

    },
    extraReducers: buidlder => {
        buidlder.
            addCase(getListStreakThunk.pending, (state) => {
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
    }
})

export default fundingSlice