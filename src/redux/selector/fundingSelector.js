export const usdtDepositSelector = state => state.funding.deposit.USDT

export const busdDepositSelector = state => state.funding.deposit.BUSD

export const totalTransferSelector = state => state.funding.transfer.total

export const pageTransferSelector = state => state.funding.transfer.page

export const dataTransferSelector = state => state.funding.transfer.data

export const depositVNDTransferSelector = state => state.funding.depositVND

export const loadingFundingSelector = state => state.funding.loading

export const paymentDetailSelector = state => state.funding.depositVND.paymentDetail

export const pageDepositVNDSelector = state => state.funding.depositVND.page

export const totalSepositVNDSelector = state => state.funding.depositVND.total

export const rateSelector = state => state.funding.depositVND.rate

export const withdrawSelector = state => state.funding.withdraw

export const totalWithdrawSelector = state => state.funding.withdraw.total

export const pageWithdrawSelector = state => state.funding.withdraw.page

export const dataWithdrawSelector = state => state.funding.withdraw.data
