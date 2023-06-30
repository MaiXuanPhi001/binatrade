import Box from '@commom/Box'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import Infomation from './Infomation'
import Security from './Security'
import UpdateInfomation from './UpdateInfomation'

const Profile = ({ navigation }) => {
  const COLOR = colors[useSelector(themeUserSelector)]

  return (
    <KeyBoardSafe
      bg={COLOR.backgroundProfile}
      paddingBottom={0}
    >
      <Header navigation={navigation} />
      <Box padding={10}>
        <Infomation />
        <UpdateInfomation />
        <Security />
      </Box>
    </KeyBoardSafe>
  )
}

export default Profile