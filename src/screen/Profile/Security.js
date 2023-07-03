import Box from '@commom/Box'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import ButtonUser from '@reuse/ButtonUser'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { generateOTPToken } from '@service/userService'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from './Infomation'
import ModalAuth2FA from './ModalAuth2FA'
import ModalChangePassword from './ModalChangePassword'
import ModalQRCode2FA from './ModalQRCode2FA'

const Security = () => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const COLORS = colors[useSelector(themeUserSelector)]

    const [OTPToken, setOTPToken] = useState({})
    const [isShowModal2FA, setShowModal2FA] = useState(false)
    const [isShowModalAuth2FA, setShowModalAuth2FA] = useState(false)
    const [isShowModalChangePassword, setShowModalChangePassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const twofa = profile.twofa !== 0

    useEffect(() => {
        handleGenerateOTPToken()
    }, [])

    const handleGenerateOTPToken = async () => {
        setLoading(true)
        const res = await generateOTPToken()
        if (res.error) return
        res?.data && setOTPToken(res.data)
        setLoading(false)

    }

    const handleChangePassword = () => {
        if (profile.twofa === 0) return
        setShowModalChangePassword(true)
    }

    const handleShowModal = () => {
        if (!twofa)
            setShowModal2FA(true)
        else
            setShowModalAuth2FA(true)
    }

    return (
        <View style={[styles.container, { marginTop: 20, borderColor: COLORS.border1 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Security')}</Txt>

            <Box marginTop={10}>
                <Box row justifySpaceBetween alignCenter>
                    <Box width={'60%'}>
                        <Txt bold size={16} color={COLORS.white}>
                            {t('Password')}
                        </Txt>
                        {!twofa && <Txt color={'red'}>{t('* You must turn on 2FA to change password')}</Txt>}
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
                        <Txt bold size={16} color={COLORS.white}>
                            {t('2FA')}
                        </Txt>
                        <Txt color={COLORS.white}>
                            {t('Required to withdraw or update the security')}
                        </Txt>
                    </Box>
                    <ButtonLiner
                        onPress={handleShowModal}
                        text={t(twofa ? 'Turn off 2FA' : 'Turn on 2FA')}
                        loading={loading}
                        width={100}
                        size={14}
                        height={40}
                    />
                </Box>
            </Box>
            <ModalChangePassword
                show={isShowModalChangePassword}
                setShow={setShowModalChangePassword}
                t={t}
            />
            <ModalQRCode2FA
                show={isShowModal2FA}
                setShow={setShowModal2FA}
                OTPToken={OTPToken}
                t={t}
                setShowModalAuth2FA={setShowModalAuth2FA}
            />
            <ModalAuth2FA
                show={isShowModalAuth2FA}
                setShow={setShowModalAuth2FA}
                setShowModal2FA={setShowModal2FA}
                t={t}
                twofa={twofa}
            />
        </View>
    )
}

export default Security