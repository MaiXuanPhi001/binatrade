import Box from '@commom/Box'
import Input from '@commom/Input'
import { navigate } from '@navigation/navigationRef'
import Banner from '@reuse/Banner'
import ButtonUser from '@reuse/ButtonUser'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Language from '@reuse/Language'
import TextError from '@reuse/TextError'
import { sendMailForgotPassword } from '@service/userService'
import userSlice from '@slice/userSlice'
import { theme } from '@theme/index'
import routes from '@util/routes'
import React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'

const ForgotPassword = () => {
  const dispacth = useDispatch()
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [checkForm, setCheckForm] = useState(false)

  const handleForgotPassword = async () => {
    if (email.trim() == '') {
      return setCheckForm(true)
    }
    dispacth(userSlice.actions.setLoading(true))
    const res = await sendMailForgotPassword(email)

    Alert.alert(t(res.message))
    dispacth(userSlice.actions.setLoading(false))
  }

  return (
    <KeyBoardSafe>
      <Language />
      <Banner
        firtText={'ForgotPass'}
        secondText={'Do you already have an account?'}
        thirdText={' Login'}
        onPress={() => navigate(routes.LOGIN)}
      />
      <Box paddingHorizontal={20}>
        <Input
          value={email}
          onChangeText={setEmail}
          borderColor={theme.colors.grayBorderInput}
          borderWidth={1}
          height={50}
          iconOne={require('@images/email.png')}
          paddingHorizontal={45}
          radius={10}
          hint={'Email'}
        />
        {(checkForm && email.trim() === '') && <TextError text={t('emailEmpty')} />}
        <ButtonUser
          onPress={handleForgotPassword}
          marginTop={20}
          text={t('ForgotPass')}
        />
      </Box>
    </KeyBoardSafe>
  )
}

export default ForgotPassword
