import { orderThunk } from "@asyncThunk/orderAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const tradeSlice = createSlice({
    name: 'trade',
    initialState: {
        loading: false,
        dataTrade: [],
        side: {},
        pendingOrder: {},
        profit: 19.50,
        time: 0,
        chartItem: {},
        highChart: 0,
        lowChart: 18092002,
        listTime: [],
        buyer: 0,
        seller: 0,
        dataDot: [],
        start: true,
        dataSize40: [],
        amount: 10,
        showModalWin: false,
    },
    reducers: {
        setDataTrade: (state, { payload }) => {
            state.dataTrade = payload.dataTrade
            state.lowChart = payload.lowChart
            state.highChart = payload.highChart
            state.listTime = payload.listTime
            state.buyer = payload.buyer
            state.seller = payload.seller
            state.dataDot = payload.dots
            state.dataSize40 = payload.dataSize40
        },
        changeDataTrade: (state, { payload }) => {
            state.dataTrade[state.dataTrade.length - 1] = payload.chartItem
            state.dataSize40[state.dataSize40.length - 1] = payload.chartItem
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
        },
        addDataTrade: (state, { payload }) => {
            state.dataTrade.push(payload.chartItem)
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
            state.listTime = payload.listTime
            state.dataDot = payload.dots
            state.dataSize40.push(payload.chartItem)
        },
        setChartItem: (state, { payload }) => {
            state.chartItem = payload
        },
        setTime: (state, { payload }) => {
            state.time = payload
        },
        resetTrade: (state) => {
            state.dataTrade = state.dataTrade.slice(20, state.dataTrade.length)
            state.dataSize40 = state.dataSize40.slice(20, state.dataSize40.length)
        },
        setBuyerAndSeller: (state, { payload }) => {
            state.buyer = payload.buyer
            state.seller = payload.seller
        },
        changeAmount: (state, { payload }) => {
            state.amount = payload
            state.profit = (payload * 95 / 100) + payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(orderThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(orderThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                if (!payload.error && payload.status) {
                    state.side = payload.data
                    state.amount = 10
                    state.profit = 19.50
                }
            })
    }
})

export default tradeSlice