
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
})

export default orderSlice