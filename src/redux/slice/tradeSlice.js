const { createSlice } = require("@reduxjs/toolkit");

const tradeSlice = createSlice({
    name: 'trade',
    initialState: {
        loading: false,
        dataTrade: [],
        time: 0,
        chartItem: {},
        highChart: null,
        lowChart: 18092002,
        listTime: [],
        buyer: 0,
        seller: 0,
        dataDot: [],
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
        },
        changeDataTrade: (state, { payload }) => {
            state.dataTrade[state.dataTrade.length - 1] = payload.chartItem
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
        },
        addDataTrade: (state, { payload }) => {
            state.dataTrade.push(payload.chartItem)
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
            state.listTime = payload.listTime
            state.dataDot = payload.dots
        },
        setChartItem: (state, { payload }) => {
            state.chartItem = payload
        },
        setTime: (state, { payload }) => {
            state.time = payload
        },
        resetTrade: (state) => {
            state.dataTrade = state.dataTrade.slice(20, state.dataTrade.length)
        },
        setBuyerAndSeller: (state, { payload }) => {
            state.buyer = payload.buyer
            state.seller = payload.seller
        }
    },
})

export default tradeSlice