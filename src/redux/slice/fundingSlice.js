import {
    cancelTransactionDepositVndThunk,
    checkDepositVNDThunk,
    createDepositVndThunk,
    createWalletThunk,
    getBankingThunk,
    getHistoryTransferThunk,
    getHistoryWidthdrawThunk,
    getPriceVNDtoUSDThunk,
    historyDepositVNDThunk,
    uploadImageDeposiVNDThunk,
    verifyTransactionDepositVndThunk,
    historyWidthdrawThunk,
} from "@asyncThunk/fundingAsyncThunk";

const { createSlice } = require("@reduxjs/toolkit");

const fundingSlice = createSlice({
    name: 'funding',
    initialState: {
        loading: false,
        deposit: {
            USDT: '',
            BUSD: '',
        },
        transfer: {
            total: 0,
            page: 1,
            data: [],
        },
        depositVND: {
            rate: 0,
            stage: 1,
            amount: 0,
            banking: [],
            idBank: '',
            content: '',
            paymentDetail: {},
            history: [],
            total: 1,
            page: 1,
        },
        withdraw: {
            total: 0,
            page: 1,
            data: [],
        },
    },
    reducers: {
        setBank: (state, action) => {
            state.depositVND.idBank = action.payload.idBank
            state.depositVND.stage = action.payload.stage
        },
        backStage: (state) => {
            state.depositVND.stage -= 1
        },
    },
    extraReducers: builder => {
        builder.
            addCase(createWalletThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.deposit[action.payload.field] = action.payload.data.address
                }
            }).
            addCase(getHistoryTransferThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getHistoryTransferThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.transfer.data = action.payload.data.array
                    state.transfer.total = action.payload.data.total
                    state.transfer.page = action.payload.page
                }
            }).
            addCase(checkDepositVNDThunk.pending, (state, action) => {
                state.loading = true
            }).
            addCase(checkDepositVNDThunk.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    if (action.payload.stage === 4 || action.payload.stage === 5) {
                        state.depositVND.paymentDetail = action.payload.paymentDetail
                    }
                    state.depositVND.stage = action.payload.stage
                }
                state.loading = false
            }).
            addCase(getBankingThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getBankingThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.depositVND.stage = action.payload.stage
                    state.depositVND.amount = action.payload.amount
                    state.depositVND.banking = action.payload.data
                }
                state.loading = false
            }).
            addCase(createDepositVndThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(verifyTransactionDepositVndThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(verifyTransactionDepositVndThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.depositVND.stage = 5
                }
                state.loading = false
            }).
            addCase(cancelTransactionDepositVndThunk.pending, (state, action) => {
                state.loading = true
            }).
            addCase(cancelTransactionDepositVndThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.depositVND.stage = 1
                }
                state.loading = false
            }).
            addCase(uploadImageDeposiVNDThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(uploadImageDeposiVNDThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.depositVND.stage = 6
                }
                state.loading = false
            }).
            addCase(historyDepositVNDThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(historyDepositVNDThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.depositVND.history = action.payload.history
                    state.depositVND.total = action.payload.data.total
                    state.depositVND.page = action.payload.page
                }
                state.loading = false
            }).
            addCase(getPriceVNDtoUSDThunk.fulfilled, (state, action) => {
                state.depositVND.rate = action.payload.data[0].value
            }).
            addCase(getHistoryWidthdrawThunk.pending, (state) => {
                state.loading = true
            }).
            addCase(getHistoryWidthdrawThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.withdraw.page = action.payload.page
                    state.withdraw.data = action.payload.data.array.reverse()
                    state.withdraw.total = action.payload.data.total
                }
            }).
            addCase(historyWidthdrawThunk.pending, (state, action) => {
                state.loading = true
            }).
            addCase(historyWidthdrawThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.withdraw.page = action.payload.page
                    state.withdraw.data = action.payload.data.array
                    state.withdraw.total = action.payload.data.total
                }
            })
    }
})

export default fundingSlice