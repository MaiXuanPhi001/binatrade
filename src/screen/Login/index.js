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
import { Alert, NativeModules } from 'react-native'
import { theme } from '@theme/index'
import { checkUser2fa } from '@service/userService'
import ModalOTP from './ModalOTP'

const Login = () => {
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const [email, setEmail] = useState('maixuanphi555@gmail.com')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('123123')
  const [isShowModalOTP, setShowModalOTP] = useState(false)
  const [checkForm, setCheckForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') return setCheckForm(true)

    const res = await checkUser2fa(email)
    if (res.status) return setShowModalOTP(true)

    const { payload } = await dispatch(loginThunk({ email, password }))
    !payload.status && Alert.alert(t(payload.message))
  }

  const handleLoginWithTwoFA = async () => {
    if (otp.trim() === '') {
      return setCheckForm(true)
    }
    setLoading(true)
    const { payload } = await dispatch(loginThunk({ email, password, otp }))
    !payload.status && Alert.alert(t(payload.message))
    setLoading(false)
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
      <Footer onLogin={handleLogin} />
      <ModalOTP
        show={isShowModalOTP}
        setShow={setShowModalOTP}
        checkForm={checkForm}
        loading={loading}
        onLoginWithTwoFA={handleLoginWithTwoFA}
        t={t}
        otp={otp}
        setOtp={setOtp}
      />
    </KeyBoardSafe>
  )
}

export default Login
