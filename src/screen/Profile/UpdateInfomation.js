import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import { checKYCUser } from '@service/userService'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { styles } from './Infomation'
import Kyc from './Kyc'
import KYCPending from './KYCPending'
import KYCSuccess from './KYCSuccess'
import Warning from './Warning'
const NOT_KYC = 'NOT_KYC'
const PENDING = 'PENDING'
const APPROVED = 'APPROVED'

const UpdateInfomation = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [kyc, setKyc] = useState(NOT_KYC)

    useEffect(() => {
        handleChecKYCUser()
    }, [])

    const handleChecKYCUser = async () => {
        setLoading(true)
        const res = await checKYCUser()

        if (res.error) {
            return alert(t(res.message))
        } else {
            if (res.status) {
                setKyc(res.data)
            } else {
                setKyc(APPROVED)
            }
        }

        setLoading(false)
    }

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('UpdateInfomation')}</Txt>
            <Warning text={t('To keep your assets safe, we need to verify your identity.')} />
            <Warning text={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />

            {loading === true ? <LoadingWhite /> :
                kyc === APPROVED ? <KYCSuccess /> :
                    kyc === PENDING ? <KYCPending /> : <Kyc onChecKYCUser={handleChecKYCUser} />}
        </View>
    )
}

export default UpdateInfomation