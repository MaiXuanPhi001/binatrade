import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import WithdrawConfirm from './WithdrawConfirm'
import History from './History'

const Withdraw = () => {
  return (
    <KeyBoardSafe paddingBottom={50}>
      <WithdrawConfirm />
      <History />
    </KeyBoardSafe>
  )
}

export default Withdraw