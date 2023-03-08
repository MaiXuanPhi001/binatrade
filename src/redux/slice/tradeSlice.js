const { createSlice } = require("@reduxjs/toolkit");

const tradeSlice = createSlice({
    name: 'trade',
    initialState: {
        loading: false,
        dataTrade: [],
        time: 0,
    },
    reducers: {
        setDataTrade: (state, { payload }) => {
            state.dataTrade = payload
        },
        changeDataTrade: (state, { payload }) => {
            state.dataTrade[state.dataTrade.length - 1] = payload
        },
        addDataTrade: (state, { payload }) => {
            state.dataTrade.shift()
            state.dataTrade.push(payload)
        }
    },
})

export default tradeSlice