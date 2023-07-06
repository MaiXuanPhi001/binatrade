import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { styles } from '@screen/Profile/Infomation'
import { kycUserSelector, profileSelector } from '@selector/userSelector'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import FormWithdraw from './FormWithdraw'

const WithdrawConfirm = ({ COLOR }) => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const kyc = useSelector(kycUserSelector)

    return (
        <View style={[styles.container, { marginTop: 10, borderColor: COLOR.border1 }]}>
            {(profile.twofa === 0 || kyc !== contants.KYC_APPROVED) ? (
                <>
                    <Txt bold color={theme.colors.blueText} size={18}>{t('Withdraw')}</Txt>
                    <Box
                        borderWidth={1}
                        borderColor={'red'}
                        backgroundColor={COLOR.red}
                        padding={10}
                        radius={5}
                        marginTop={20}
                        marginBottom={10}
                    >
                        <Txt>
                            {t('Please update your identity information and turn on 2FA before being able to transfer. Contact your support for help.')}
                        </Txt>
                    </Box>
                </>

            ) : (
                <FormWithdraw t={t} />
            )}
        </View>
    )
}

export default WithdrawConfirm