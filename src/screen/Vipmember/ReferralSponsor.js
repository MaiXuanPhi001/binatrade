import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const ReferralSponsor = () => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]
    const profile = useSelector(profileSelector)

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
        >
            <Txt size={15} bold color={colors.gray5}>
                {t('Referral sponsor:')}
                <Txt size={17} bold color={COLOR.white}> admin</Txt>
            </Txt>
            <Box
                marginTop={20}
                borderTopWidth={1}
                borderColor={COLOR.border1}
                paddingTop={20}
            >
                <Box row justifySpaceBetween>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            {t('Total referrals')}
                        </Txt>
                        <Txt size={17} color={colors.blueGreen} bold marginVertical={10}>
                            {profile?.totalMember}
                        </Txt>
                    </Box>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            {t('Total agencies')}
                        </Txt>
                        <Txt size={17} color={'#15b3f9'} bold marginVertical={10}>
                            {profile?.totalMemberVip}
                        </Txt>
                    </Box>
                </Box>

                <Box row justifySpaceBetween>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            {t('Trading commission')}
                        </Txt>
                        <Txt size={17} color={'#e22b5a'} bold marginVertical={10}>
                            {profile?.totalCommission?.toFixed(1)}
                        </Txt>
                    </Box>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            {t('VIP commission')}
                        </Txt>
                        <Txt size={17} color={COLOR.white} bold marginVertical={10}>
                            {profile?.commissionMemberVip}
                        </Txt>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReferralSponsor