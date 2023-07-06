import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Form = ({ email, setEmail, password, setPassword, checkForm }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]
    const [security, setSecurity] = useState(true)

    return (
        <Box paddingHorizontal={20}>
            <Txt bold color={COLOR.white}>Email</Txt>
            <Input
                value={email}
                onChangeText={setEmail}
                color={COLOR.white}
                hintColor={COLOR.white4}
                borderColor={COLOR.border2}
                borderWidth={1}
                height={50}
                paddingHorizontal={20}
                radius={10}
                marginTop={10}
            />
            {(checkForm && email.trim() === '') && <TextError text={t('emailEmpty')} />}

            <Txt bold marginTop={20} color={COLOR.white}>
                {t('Password')}
            </Txt>
            <Input
                onPress={() => setSecurity(!security)}
                value={password}
                onChangeText={setPassword}
                color={COLOR.white}
                borderColor={COLOR.border2}
                borderWidth={1}
                height={50}
                paddingHorizontal={20}
                radius={10}
                marginTop={10}
                security={security}
                colorIcon={COLOR.white}
                iconTwo={security ? require('@images/eye-open.png') : require('@images/eye-close.png')}
            />
            {(checkForm && password.trim() === '') && <TextError text={t('passwordEmpty')} />}
        </Box>
    )
}

export default Form
