import { getAllOrderPendingUserThunk, orderThunk } from "@asyncThunk/tradeAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const tradeSlice = createSlice({
    name: 'trade',
    initialState: {
        loading: false,
        candles: [],
        order: {
            amountTotal: 0,
            side: '',
            type: '',
        },
        pendingOrder: {},
        profit: 0,
        time: 0,
        chartItem: {},
        highChart: 0,
        lowChart: 18092002,
        listTime: [],
        buyer: 0,
        seller: 0,
        dataDot: [],
        start: true,
        dataTrade: [],
        amount: 10,
        showModalWin: false,
    },
    reducers: {
        setDataTrade: (state, { payload }) => {
            state.candles = payload.candles
            state.lowChart = payload.lowChart
            state.highChart = payload.highChart
            state.listTime = payload.listTime
            state.buyer = payload.buyer
            state.seller = payload.seller
            state.dataDot = payload.dots
            state.dataTrade = payload.dataAPI
        },
        changeDataTrade: (state, { payload }) => {
            state.candles[state.candles.length - 1] = payload.chartItem
            state.dataTrade[state.dataTrade.length - 1] = payload.chartItem
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
        },
        addDataTrade: (state, { payload }) => {
            state.candles.push(payload.chartItem)
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
            state.listTime = payload.listTime
            state.dataDot = payload.dots
            state.dataTrade.push(payload.chartItem)
        },
        setChartItem: (state, { payload }) => {
            state.chartItem = payload
        },
        setTime: (state, { payload }) => {
            state.time = payload
        },
        resetTrade: (state) => {
            state.candles = state.candles.slice(20, state.candles.length)
            state.dataTrade = state.dataTrade.slice(20, state.dataTrade.length)
            state.highChart = 0
            state.lowChart = 18092022
        },
        setBuyerAndSeller: (state, { payload }) => {
            state.buyer = payload.buyer
            state.seller = payload.seller
        },
        changeAmount: (state, { payload }) => {
            state.amount = payload
        },
        resetOrder: (state) => {
            state.order.amountTotal = 0
            state.side = ''
            state.profit = 0
            state.showModalWin = false
        },
        setShowModalWin: (state) => {
            state.showModalWin = true
        }
    },
    extraReducers: builder => {
        builder
            .addCase(orderThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(orderThunk.fulfilled, (state, { payload }) => {
                state.loading = false
                if (!payload.error && payload.status) {
                    state.order.type = payload.type
                    state.order.side = payload.data.side
                    state.order.amountTotal = state.order.amountTotal + payload.data.amount
                    state.profit = state.order.amountTotal + (state.order.amountTotal * 95 / 100)
                }
            })
            .addCase(getAllOrderPendingUserThunk.fulfilled, (state, { payload }) => {
                if (payload.status && payload.data.length > 0) {
                    state.order.type = payload.type
                    state.order.side = payload.data[0].side
                    let [sum, i] = [0, 0]
                    while (i < payload.data.length) {
                        sum += payload.data[i].amount
                        i++
                    }
                    state.order.amountTotal = sum
                    state.profit = state.order.amountTotal + (state.order.amountTotal * 95 / 100)
                }
            })
    }
})

export default tradeSlice