import React, { useState } from 'react'
import Box from '@commom/Box'
import Input from '@commom/Input'
import { theme } from '@theme/index'
import TextError from '@reuse/TextError'
import { useTranslation } from 'react-i18next'
import Txt from '@commom/Txt'

const Form = ({ email, setEmail, password, setPassword, checkForm }) => {
    const { t } = useTranslation()

    const [security, setSecurity] = useState(true)

    return (
        <Box paddingHorizontal={20}>
            <Txt bold>Email</Txt>
            <Input
                value={email}
                onChangeText={setEmail}
                borderColor={theme.colors.gray4}
                borderWidth={1}
                height={50}
                paddingHorizontal={20}
                radius={10}
                marginTop={10}
            />
            {(checkForm && email.trim() === '') && <TextError text={t('emailEmpty')} />}

            <Txt bold marginTop={20}>{t('Password')}</Txt>
            <Input
                onPress={() => setSecurity(!security)}
                value={password}
                onChangeText={setPassword}
                borderColor={theme.colors.gray4}
                borderWidth={1}
                height={50}
                paddingHorizontal={20}
                radius={10}
                marginTop={10}
                security={security}
                iconTwo={security ? require('@images/eye-open.png') : require('@images/eye-close.png')}
            />
            {(checkForm && password.trim() === '') && <TextError text={t('passwordEmpty')} />}
        </Box>
    )
}

export default Form
