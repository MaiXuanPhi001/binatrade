import Box from '@commom/Box'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Main from './Main'
import TotalAssets from './TotalAssets'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import { themeUserSelector } from '@selector/userSelector'

const Wallet = ({ navigation }) => {
  const COLOR = colors[useSelector(themeUserSelector)]

  return (
    <KeyBoardSafe
      bg={COLOR.backgroundProfile}
      paddingBottom={0}
    >
      <Header navigation={navigation} />
      <Box
        paddingHorizontal={10}
        marginTop={10}
      >
        <TotalAssets COLOR={COLOR} />
        <Main COLOR={COLOR} />
      </Box>
    </KeyBoardSafe>
  )
}

export default Wallet