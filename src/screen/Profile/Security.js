import { View } from 'react-native'
import React from 'react'
import { styles } from './Infomation'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import Txt from '@commom/Txt'
import Box from '@commom/Box'
import ButtonUser from '@reuse/ButtonUser'

const Security = () => {
    const { t } = useTranslation()

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Security')}</Txt>

            <Box
                marginTop={10}
            >
                <Box
                    row
                    justifySpaceBetween
                    alignCenter
                >
                    <Box width={'60%'}>
                        <Txt bold size={16}>{t('Password')}</Txt>
                        <Txt color={'red'}>{t('* You must turn on 2FA to change password')}</Txt>
                    </Box>
                    <ButtonUser
                        text={t('Change password')}
                        width={140}
                        size={14}
                        height={40}
                    />
                </Box>

                <Box
                    row
                    justifySpaceBetween
                    alignCenter
                    marginTop={20}
                >
                    <Box width={'60%'}>
                        <Txt bold size={16}>{t('2FA')}</Txt>
                        <Txt>{t('Required to withdraw or update the security')}</Txt>
                    </Box>
                    <ButtonUser
                        text={t('Turn on 2FA')}
                        width={100}
                        size={14}
                        height={40}
                    />
                </Box>
            </Box>
        </View>
    )
}

export default Security