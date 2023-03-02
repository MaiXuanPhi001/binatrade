import { getChartThunk } from "@asyncThunk/chartAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const chartSlice = createSlice({
    name: 'chart',
    initialState: {
        symbol: 'BTCUSDT',
        data: [],
        pointOder: null // điểm đặt cược
    },
    reducers: {
        addChart: (state, action) => {
            state.data.push(action.payload)
        },
        changeLastChart: (state, action) => {
            state.data = action.payload
        },
        setSymbol: (state, action) => {
            state.symbol = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getChartThunk.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.data = action.payload.data
            }
        })
    }
})

export default chartSlice