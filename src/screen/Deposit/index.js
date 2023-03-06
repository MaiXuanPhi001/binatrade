import React from 'react'
import USDT from './USDT'
import History from './History'
import KeyBoardSafe from '@reuse/KeyBoardSafe'

const Deposit = () => {
  return (
    <KeyBoardSafe paddingBottom={0}>
      <USDT />
      <History />
    </KeyBoardSafe>
  )
}

export default Deposit