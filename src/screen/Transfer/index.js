import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import TransferConfirm from './TransferConfirm'
import History from './History'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import { themeUserSelector } from '@selector/userSelector'

const Transfer = () => {
  const COLOR = colors[useSelector(themeUserSelector)]

  return (
    <KeyBoardSafe
      bg={COLOR.backgroundProfile}
      paddingBottom={50}
    >
      <TransferConfirm COLOR={COLOR} />
      <History COLOR={COLOR} />
    </KeyBoardSafe>
  )
}

export default Transfer