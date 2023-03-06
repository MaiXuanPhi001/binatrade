import { navigate } from '@navigation/navigationRef'
import Banner from '@reuse/Banner'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Language from '@reuse/Language'
import { theme } from '@theme/index'
import routes from '@util/routes'
import React from 'react'
import Form from './Form'

const SignUp = () => {
  return (
    <KeyBoardSafe bg={theme.colors.drawer}>
      <Language />
      <Banner
        firtText={'Create your account'}
        secondText={'Do you already have an account?'}
        thirdText={' Login'}
        onPress={() => navigate(routes.LOGIN)}
      />
      <Form />
    </KeyBoardSafe>
  )
}

export default SignUp
