import Box from '@commom/Box'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import ButtonUser from '@reuse/ButtonUser'
import { profileSelector } from '@selector/userSelector'
import { generateOTPToken } from '@service/userService'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from './Infomation'
import ModalQRCode2FA from './ModalQRCode2FA'

const Security = () => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const [OTPToken, setOTPToken] = useState({})
    const [isShowModal2FA, setShowModal2FA] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleGenerateOTPToken()
    }, [])

    const handleGenerateOTPToken = async () => {
        setLoading(true)
        const res = await generateOTPToken()
        if (res.status) {
            setOTPToken(res.data)
            setLoading(false)
        }
    }

    const handleChangePassword = () => {
        if (profile.twofa === 0) return

    }

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Security')}</Txt>

            <Box marginTop={10}>
                <Box row justifySpaceBetween alignCenter>
                    <Box width={'60%'}>
                        <Txt bold size={16}>{t('Password')}</Txt>
                        {profile.twofa === 0 && <Txt color={'red'}>{t('* You must turn on 2FA to change password')}</Txt>}
                    </Box>
                    <ButtonUser
                        onPress={handleChangePassword}
                        text={t('Change password')}
                        width={140}
                        size={14}
                        height={40}
                    />
                </Box>

                <Box row justifySpaceBetween alignCenter marginTop={20}>
                    <Box width={'60%'}>
                        <Txt bold size={16}>{t('2FA')}</Txt>
                        <Txt>{t('Required to withdraw or update the security')}</Txt>
                    </Box>
                    <ButtonLiner
                        onPress={() => setShowModal2FA(true)}
                        text={t('Turn on 2FA')}
                        loading={loading}
                        width={100}
                        size={14}
                        height={40}
                    />
                </Box>
            </Box>
            <ModalQRCode2FA
                show={isShowModal2FA}
                setShow={setShowModal2FA}
                OTPToken={OTPToken}
                t={t}
            />
        </View>
    )
}

export default Security