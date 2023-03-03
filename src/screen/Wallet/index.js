import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import TotalAssets from './TotalAssets'
import Box from '@commom/Box'
import Tab from './Tab'

const Wallet = () => {
  return (
    <KeyBoardSafe>
      <Box paddingHorizontal={10}>
        <TotalAssets />
        <Tab />
      </Box>
    </KeyBoardSafe>
  )
}

export default Wallet