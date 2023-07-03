import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import { navigate } from '@navigation/navigationRef'
import routes from '@util/routes'
import ButtonUser from '@reuse/ButtonUser'
import { useTranslation } from 'react-i18next'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import { themeUserSelector } from '@selector/userSelector'

const Footer = ({ onLogin }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box
            width={'100%'}
            paddingHorizontal={20}
            alignCenter
        >
            <Box width={'100%'} alignEnd marginVertical={20}>
                <Btn onPress={() => navigate(routes.FORGOT_PASSWORD)}>
                    <Txt color={COLOR.white}>{t('ForgotPass')}</Txt>
                </Btn>
            </Box>

            <ButtonUser
                marginTop={20}
                onPress={onLogin}
                text={t('login')}
            />
        </Box>
    )
}

export default Footer