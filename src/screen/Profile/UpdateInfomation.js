import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './Infomation'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import Warning from './Warning'
import Box from '@commom/Box'
import Img from '@commom/Img'
import { useTranslation } from 'react-i18next'
import { checKYCUser } from '@service/userService'
import LoadingWhite from '@reuse/LoadingWhite'
import Kyc from './Kyc'

const UpdateInfomation = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [kyc, setKyc] = useState(false)

    useEffect(() => {
        handleChecKYCUser()
    }, [])

    const handleChecKYCUser = async () => {
        // setLoading(true)
        // const res = await checKYCUser()
        // // if (res.) {

        // // }
        // setLoading(false)
    }

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('UpdateInfomation')}</Txt>
            <Warning text={t('To keep your assets safe, we need to verify your identity.')} />
            <Warning text={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />

            {loading ?
                <LoadingWhite /> :
                kyc ? (
                    <Box
                        row
                        alignCenter
                        marginTop={20}
                        backgroundColor={'#162312'}
                        padding={10}
                    >
                        <Img
                            source={require('@images/profile/check.png')}
                            width={25}
                            height={25}
                            marginRight={5}
                        />
                        <Txt bold size={16}>{t('Verified')}</Txt>
                    </Box>
                ) : (
                    <Kyc />
                )
            }
        </View>
    )
}

export default UpdateInfomation