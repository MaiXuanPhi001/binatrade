import Box from '@commom/Box'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Infomation from './Infomation'
import Security from './Security'
import UpdateInfomation from './UpdateInfomation'

const Profile = ({ navigation }) => {
  return (
    <KeyBoardSafe bg={'#011022'} paddingBottom={0}>
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