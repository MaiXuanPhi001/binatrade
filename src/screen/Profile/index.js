import React from 'react'
import Box from '@commom/Box'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Infomation from './Infomation'
import UpdateInfomation from './UpdateInfomation'
import Security from './Security'

const Profile = () => {
  return (
    <KeyBoardSafe bg={'#011022'} paddingBottom={0}>
      <Box padding={10}>
        <Infomation />
        <UpdateInfomation />
        <Security />
      </Box>
    </KeyBoardSafe>
  )
}

export default Profile