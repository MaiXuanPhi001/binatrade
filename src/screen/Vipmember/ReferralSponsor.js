import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'

const ReferralSponsor = () => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
        >
            <Txt size={15} bold color={colors.gray5}>
                Referral sponsor: <Txt size={17} bold> admin</Txt>
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
                            Total referrals
                        </Txt>
                        <Txt size={17} color={colors.blueGreen} bold marginVertical={10}>
                            1
                        </Txt>
                    </Box>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            Total agencies
                        </Txt>
                        <Txt size={17} color={'#15b3f9'} bold marginVertical={10}>
                            2
                        </Txt>
                    </Box>
                </Box>

                <Box row justifySpaceBetween>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            Trading commission
                        </Txt>
                        <Txt size={17} color={'#e22b5a'} bold marginVertical={10}>
                            5.8
                        </Txt>
                    </Box>
                    <Box>
                        <Txt size={15} color={colors.gray5} bold>
                            VIP commission
                        </Txt>
                        <Txt size={17} color={COLOR.white} bold marginVertical={10}>
                            62.5
                        </Txt>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReferralSponsor