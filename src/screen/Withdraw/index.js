import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import History from './History'
import WithdrawConfirm from './WithdrawConfirm'

const Withdraw = () => {
  const COLOR = colors[useSelector(themeUserSelector)]

  return (
    <KeyBoardSafe
      bg={COLOR.backgroundProfile}
      paddingBottom={50}
    >
      <WithdrawConfirm COLOR={COLOR} />
      <History COLOR={COLOR} />
    </KeyBoardSafe>
  )
}

export default Withdraw