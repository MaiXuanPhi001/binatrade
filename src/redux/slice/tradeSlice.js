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
    },
    reducers: {
        setDataTrade: (state, { payload }) => {
            state.dataTrade = payload.dataTrade
            state.lowChart = payload.lowChart
            state.highChart = payload.highChart
            state.listTime = payload.listTime
        },
        changeDataTrade: (state, { payload }) => {
            state.dataTrade[state.dataTrade.length - 1] = payload.chartItem
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
        },
        addDataTrade: (state, { payload }) => {
            state.dataTrade.shift()
            state.dataTrade.push(payload.chartItem)
            state.highChart = payload.highChart
            state.lowChart = payload.lowChart
            state.listTime = payload.listTime
        },
        setChartItem: (state, { payload }) => {
            state.chartItem = payload
        },
        setTime: (state, { payload }) => {
            state.time = payload
        }
    },
})

export default tradeSlice