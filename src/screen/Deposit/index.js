import React, { useRef } from 'react'
import USDT from './USDT'
import History from './History'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import ToastTop from '@reuse/ToastTop'
import Box from '@commom/Box'

const Deposit = () => {
  const toastTopRef = useRef(null)

  return (
    <Box flex={1}>
      <ToastTop ref={toastTopRef} />
      <KeyBoardSafe paddingBottom={0}>
        <USDT toastTopRef={toastTopRef} />
        <History />
      </KeyBoardSafe>
    </Box>
  )
}

export default Deposit