import { Alert, StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { useState } from 'react'
import Input from '@commom/Input'
import { theme } from '@theme/index'
import ButtonUser from '@reuse/ButtonUser'
import routes from '@util/routes'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import TextError from '@reuse/TextError'
import { navigate } from '@navigation/navigationRef'
import { signUp } from '@service/userService'
import { alertCannotConnect, cannotConnect } from '@method/alert'
import { useDispatch } from 'react-redux'
import userSlice from '@slice/userSlice'
import { useTranslation } from 'react-i18next'

const Form = () => {
    const dispacth = useDispatch()
    const { t } = useTranslation()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [referral, setReferral] = useState('c66e2482e775')
    const [checkForm, setCheckForm] = useState(false)

    const handleSignUp = async () => {
        if (username.trim() == '' || email.trim() == '' || password.trim() == '' || confirmPassword.trim() == ''
            || confirmPassword.trim() != password.trim()) {
            return setCheckForm(true)
        }
        dispacth(userSlice.actions.setLoading(true))

        const res = await signUp({
            referral,
            email,
            password,
            userName: username,
        })
        console.log(res)
        Alert.alert(t(res.message))

        dispacth(userSlice.actions.setLoading(false))
    }

    return (
        <Box paddingHorizontal={20}>
            <Input
                value={username}
                onChangeText={setUsername}
                borderColor={theme.colors.grayBorderInput}
                borderWidth={1}
                height={50}
                iconOne={require('@images/email.png')}
                paddingHorizontal={45}
                radius={10}
                hint={t('username')}
                marginTop={20}
            />
            {(checkForm && username.trim() == '') && <TextError text={t('usernameEmpty')} />}

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
                marginTop={20}
            />
            {(checkForm && email.trim() == '') && <TextError text={t('emailEmpty')} />}

            <Input
                value={password}
                onChangeText={setPassword}
                borderColor={theme.colors.grayBorderInput}
                borderWidth={1}
                height={50}
                iconOne={require('@images/lock.png')}
                paddingHorizontal={45}
                radius={10}
                hint={t('pass')}
                marginTop={20}
            />
            {(checkForm && password.trim() == '') && <TextError text={t('passwordEmpty')} />}

            <Input
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                borderColor={theme.colors.grayBorderInput}
                borderWidth={1}
                height={50}
                iconOne={require('@images/lock.png')}
                paddingHorizontal={45}
                radius={10}
                hint={t('confirmPass')}
                marginTop={20}
            />
            {(checkForm && confirmPassword.trim() == '') && <TextError text={t('ConfirmPassEmpty')} />}
            {(checkForm && confirmPassword.trim() != password.trim() && confirmPassword.trim() != '') &&
                <TextError text={t('PassNotMatch')} />}

            <Input
                value={referral}
                onChangeText={setReferral}
                borderColor={theme.colors.grayBorderInput}
                borderWidth={1}
                height={50}
                iconOne={require('@images/lock.png')}
                paddingHorizontal={45}
                radius={10}
                marginTop={20}
                disabled={false}
            />

            <ButtonUser
                onPress={handleSignUp}
                marginTop={30}
                text={t('createAccount')}
            />
        </Box>
    )
}

export default Form

const styles = StyleSheet.create({})