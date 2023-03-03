import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import TotalAssets from './TotalAssets'
import Box from '@commom/Box'
import Main from './Main'

const Wallet = () => {
  return (
    <KeyBoardSafe>
      <Box paddingHorizontal={10}>
        <TotalAssets />
        <Main />
      </Box>
    </KeyBoardSafe>
  )
}

export default Wallet