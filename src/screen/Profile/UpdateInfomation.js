import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import { kycUserSelector } from '@selector/userSelector'
import { checKYCUser } from '@service/userService'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from './Infomation'
import Kyc from './Kyc'
import KYCPending from './KYCPending'
import KYCSuccess from './KYCSuccess'
import Warning from './Warning'


const UpdateInfomation = () => {
    const { t } = useTranslation()
    const kyc = useSelector(kycUserSelector)

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Update Infomation')}</Txt>
            <Warning text={t('To keep your assets safe, we need to verify your identity.')} />
            <Warning text={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />

            {kyc === '' ? <LoadingWhite /> :
                kyc === contants.KYC_APPROVED ? <KYCSuccess /> :
                    kyc === contants.KYC_PENDING ? <KYCPending /> : <Kyc />}
        </View>
    )
}

export default UpdateInfomation