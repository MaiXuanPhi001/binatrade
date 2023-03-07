import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import TransferConfirm from './TransferConfirm'
import History from './History'

const Transfer = () => {
  return (
    <KeyBoardSafe paddingBottom={50}>
      <TransferConfirm />
      <History />
    </KeyBoardSafe>
  )
}

export default Transfer