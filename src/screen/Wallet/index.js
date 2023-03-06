import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import TotalAssets from './TotalAssets'
import Box from '@commom/Box'
import Main from './Main'
import Header from '@reuse/Header'

const Wallet = ({ navigation }) => {
  return (
    <KeyBoardSafe>
      <Header navigation={navigation} />
      <Box
        paddingHorizontal={10}
        marginTop={10}
      >
        <TotalAssets />
        <Main />
      </Box>
    </KeyBoardSafe>
  )
}

export default Wallet