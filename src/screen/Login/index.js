import React, { useState } from 'react'
import Banner from '@reuse/Banner'
import Form from './Form'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Language from '@reuse/Language'
import { navigate } from '@navigation/navigationRef'
import routes from '@util/routes'
import { loginThunk } from '@asyncThunk/userAsyncThunk'
import { Alert } from 'react-native'
import { theme } from '@theme/index'

const Login = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const [email, setEmail] = useState('test@gmail.com')
  const [password, setPassword] = useState('123123')
  const [checkForm, setCheckForm] = useState(false)

  const handlerLogin = async () => {
    if (email.trim() === '' || password.trim() === '') return setCheckForm(true)
    const { payload } = await dispatch(loginThunk({ email, password }))
    !payload.status && Alert.alert(t(payload.message))
  }

  return (
    <KeyBoardSafe bg={theme.colors.drawer}>
      <Language />
      <Banner
        firtText={'Log in to your account'}
        secondText={'Do not have an account?'}
        thirdText={' Create an account'}
        onPress={() => navigate(routes.SIGN_UP)}
      />
      <Form
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        checkForm={checkForm}
      />
      <Footer onLogin={handlerLogin} />
    </KeyBoardSafe>
  )
}

export default Login
