import Box from '@commom/Box'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import ToastTop from '@reuse/ToastTop'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import History from './History'
import USDT from './USDT'

const Deposit = () => {
  const toastTopRef = useRef(null)
  const COLOR = colors[useSelector(themeUserSelector)]

  return (
    <Box flex={1}>
      <ToastTop ref={toastTopRef} />
      <KeyBoardSafe
        bg={COLOR.backgroundProfile}
        paddingBottom={0}
      >
        <USDT toastTopRef={toastTopRef} COLOR={COLOR} />
        <History COLOR={COLOR} />
      </KeyBoardSafe>
    </Box>
  )
}

export default Deposit