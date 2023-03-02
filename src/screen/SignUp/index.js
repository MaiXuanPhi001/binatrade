import Banner from '@reuse/Banner'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Language from '@reuse/Language'
import React from 'react'
import Form from './Form'

const SignUp = () => {
  return (
    <KeyBoardSafe>
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
