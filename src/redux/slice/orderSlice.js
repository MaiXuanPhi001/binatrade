import { getAllOrderPendingUserThunk, orderThunk } from "@asyncThunk/orderAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        side: '',
        pendingOrder: {},
        amount: 0,
        amountOrder: 0,
        profit: 0,
        result: '',
        time: null,
        buyer: 0,
        seller: 0,
        toast: {
            type: '',
            title: ''
        },
        modalResult: false,
        loading: false,
    },
    reducers: {
        order: (state, action) => {
            state.side = action.payload.side
            state.toast = action.payload.toast
        },
        setAmount: (state, action) => {
            state.amount = action.payload
        },
        resetOrder: (state, action) => {
            state.side = ''
            state.amountOrder = 0
            state.profit = 0
            state.result = ''
            state.result
            state.modalResult = false
        },
        setTime: (state, action) => {
            state.time = action.payload
        },
        setToast: (state, action) => {
            state.toast = action.payload
        },
        setModalResult: (state, action) => {
            state.result = action.payload.result
            state.modalResult = action.payload.show
        },
        setSellerBuyer: (state, action) => {
            state.buyer = action.payload.buyer
            state.seller = action.payload.seller
        }
    },
    extraReducers: builder => {
        builder
            .addCase(orderThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(orderThunk.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.error && action.payload.status) {
                    state.side = action.payload.data
                    state.profit = (state.amountOrder + action.payload.amount) * 95 / 100 + ((state.amountOrder + action.payload.amount))
                    state.amountOrder = state.amountOrder + action.payload.amount
                    state.symbol = action.payload.symbol
                }
            })
            .addCase(getAllOrderPendingUserThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    if (action.payload?.data.length > 0) {
                        state.side = action.payload.data[0].side
                        state.amountOrder = action.payload.data[0].amount
                        state.profit = action.payload.data[0].amount * 95 / 100 + action.payload.data[0].amount
                    } else {
                        state.side = ''
                        state.amountOrder = 0
                        state.profit = 0
                        state.result = ''
                        state.result
                        state.modalResult = false
                    }
                }
            })
    }
})

export default orderSlice