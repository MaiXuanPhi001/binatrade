import { View } from 'react-native'
import React from 'react'
import { styles } from '@screen/Profile/Infomation'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { profileSelector } from '@selector/userSelector'
import Box from '@commom/Box'

const WithdrawConfirm = () => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)

    return (
        <View style={[styles.container, { marginTop: 10 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Transfer')}</Txt>
            {profile.twofa === 0 &&
                <Box
                    borderWidth={1}
                    borderColor={'red'}
                    backgroundColor={'#2a1115'}
                    padding={10}
                    radius={5}
                    marginTop={20}
                    marginBottom={10}
                >
                    <Txt>{t('Please update your identity information and turn on 2FA before being able to transfer. Contact your support for help.')}</Txt>
                </Box>
            }
        </View>
    )
}

export default WithdrawConfirm