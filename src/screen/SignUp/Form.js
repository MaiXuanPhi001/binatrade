import Box from '@commom/Box'
import Input from '@commom/Input'
import ButtonUser from '@reuse/ButtonUser'
import TextError from '@reuse/TextError'
import { themeUserSelector } from '@selector/userSelector'
import { signUp } from '@service/userService'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Form = () => {
    const dispacth = useDispatch()
    const { t } = useTranslation()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [referral, setReferral] = useState('c66e2482e775')
    const [checkForm, setCheckForm] = useState(false)

    const COLOR = colors[useSelector(themeUserSelector)]

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
        Alert.alert(t(res.message))

        dispacth(userSlice.actions.setLoading(false))
    }

    return (
        <Box paddingHorizontal={20}>
            <Input
                value={username}
                onChangeText={setUsername}
                color={COLOR.white}
                colorIcon={COLOR.white}
                hintColor={COLOR.white4}
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
                color={COLOR.white}
                hintColor={COLOR.white4}
                colorIcon={COLOR.white}
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
                color={COLOR.white}
                hintColor={COLOR.white4}
                colorIcon={COLOR.white}
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
                color={COLOR.white}
                colorIcon={COLOR.white}
                hintColor={COLOR.white4}
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
                color={COLOR.white}
                colorIcon={COLOR.white}
                hintColor={COLOR.white4}
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