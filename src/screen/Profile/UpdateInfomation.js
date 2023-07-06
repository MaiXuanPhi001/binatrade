import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import { kycUserSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import KYCPending from './KYCPending'
import KYCSuccess from './KYCSuccess'
import Kyc from './Kyc'
import Warning from './Warning'

const UpdateInfomation = () => {
    const { t } = useTranslation()
    const kyc = useSelector(kycUserSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <View style={[styles.container, { borderColor: COLOR.border1 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>
                {t('Update Infomation')}
            </Txt>
            <Warning text={t('To keep your assets safe, we need to verify your identity.')} />
            <Warning text={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />

            {kyc === '' ? <LoadingWhite /> :
                kyc === contants.KYC_APPROVED ? <KYCSuccess COLOR={COLOR} /> :
                    kyc === contants.KYC_PENDING ? <KYCPending COLOR={COLOR} /> : <Kyc COLOR={COLOR} />}
        </View>
    )
}

export default UpdateInfomation

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
})