import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    cancelTransactionDepositVnd,
    checkDepositVND,
    createDepositVnd,
    createWallet,
    getBanking,
    getHistoryTransfer,
    historyDepositVND,
    uploadImageDeposiVND,
    verifyTransactionDepositVnd,
    getPriceVNDtoUSD,
    getHistoryWidthdraw,
} from "@service/fundingService";
import { historyWidthdraw } from "@service/historyService";
import bank from "@util/bank";

export const createWalletThunk = createAsyncThunk('funding/createWallet', async (data) => {
    const res = await createWallet(data)
    return { ...res, field: data.field }
})

export const getHistoryTransferThunk = createAsyncThunk('funding/getHistoryTransfer', async (data) => {
    const res = await getHistoryTransfer(data)
    return { ...res, page: data.page }
})

export const checkDepositVNDThunk = createAsyncThunk('funding/checkDepositVND', async () => {
    const res = await checkDepositVND()
    if (!res.error) {
        if (!res.status) {
            // status == false chưa có giao dịch, quay lại bước bước 1
            return { ...res, stage: 1 }
        } else {
            // status == true
            if (res.data.type_admin === 0 && res.data.type_user === 0) {
                // type_admin == 0 && type user user == 0 mới tạo giao dịch chứ chưa xác nhận | quay về bước 4
                return { ...res, stage: 4, paymentDetail: res.data }
            } else if (res.data.type_admin === 2 && res.data.type_user === 0) {
                // type_admin == 2 && type user user == 0 user đã nhấn xác nhận chuyển tiền rồi
                if (res.data.images) {
                    // nếu có ảnh thì chuyển sang bước 6
                    return { ...res, stage: 6 }
                } else {
                    // chưa có ảnh thi chuyển sang bước 5
                    return { ...res, stage: 5, paymentDetail: res.data }
                }
            } else {
                // quay về bước 1
                return { ...res, stage: 1 }
            }
        }
    }
    return res
})

export const getBankingThunk = createAsyncThunk('funding/getBanking', async (data) => {
    const res = await getBanking()
    if (res.status) {
        let db = []
        bank.forEach(item => {
            res.data.forEach(element => {
                if (item.name === element.name_banking) {
                    db.push({
                        ...element,
                        image: item.image,
                    })
                }
            })
        })

        return { ...res, stage: data.stage, amount: data.amount, data: db }
    }
    return res
})

export const createDepositVndThunk = createAsyncThunk('funding/createDepositVnd', async (data) => {
    const res = await createDepositVnd(data)
    return res
})

export const verifyTransactionDepositVndThunk = createAsyncThunk('funding/verifyTransactionDepositVnd', async (data) => {
    const res = await verifyTransactionDepositVnd(data)
    return res
})

export const cancelTransactionDepositVndThunk = createAsyncThunk('funding/cancelTransactionDepositVnd', async (data) => {
    const res = await cancelTransactionDepositVnd(data)
    return res
})

export const uploadImageDeposiVNDThunk = createAsyncThunk('funding/uploadImageDeposiVND', async (formData) => {
    const res = await uploadImageDeposiVND(formData)
    return res
})

export const historyDepositVNDThunk = createAsyncThunk('history/historyDepositVND', async (data) => {
    const res = await historyDepositVND(data)
    if (res.status) {
        let array = res.data.array
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < bank.length; j++) {
                if (array[i].bank_name === bank[j].name) {
                    array[i] = { ...array[i], img: bank[j].image }
                    break
                }
            }
        }

        return { ...res, stage: data.stage, amount: data.amount, history: array, page: data.page }
    }
    return res
})

export const getPriceVNDtoUSDThunk = createAsyncThunk('history/getPriceVNDtoUSD', async () => {
    const res = await getPriceVNDtoUSD()
    return res
})

export const getHistoryWidthdrawThunk = createAsyncThunk('history/getHistoryWidthdraw', async (data) => {
    const res = await getHistoryWidthdraw(data)
    if (res.status) {
        let db = []
        bank.forEach(item => {
            res.data.array.forEach(element => {
                if (item.name === element.nameBanking) {
                    db.push({
                        ...element,
                        image: item.image,
                    })
                }
            })
        })

        return {
            ...res,
            page: data.page,
            data: {
                ...res.data,
                array: db
            }
        }
    }
    return res
})

export const historyWidthdrawThunk = createAsyncThunk('history/historyWidthdraw', async (data) => {
    const res = await historyWidthdraw(data)
    return { ...res, page: data.page }
})