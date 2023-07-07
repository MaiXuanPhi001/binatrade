import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { numberWithCommas } from '@method/format'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { weekStatisticsOrder } from '@service/fundingService'
import { colors } from '@theme/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Level = () => {
    const COLOR = colors[useSelector(themeUserSelector)]
    const profile = useSelector(profileSelector)
    const [indicator, setIndicator] = useState({})

    useEffect(() => {
        handleWeekStatisticsOrder()
    }, [])

    const handleWeekStatisticsOrder = async () => {
        const res = await weekStatisticsOrder('live')
        let [f1Volume, f1Vip] = [0, 0]

        if (res.status) {
            if (profile.level === 0) {
                [f1Volume, f1Vip] = [0, 0]
            } else if (profile.level === 1) {
                [f1Volume, f1Vip] = [2000, 3]
            } else if (profile.level === 2) {
                [f1Volume, f1Vip] = [4000, 4]
            } else if (profile.level === 3) {
                [f1Volume, f1Vip] = [8000, 5]
            } else if (profile.level === 4) {
                [f1Volume, f1Vip] = [16000, 6]
            } else if (profile.level === 5) {
                [f1Volume, f1Vip] = [32000, 7]
            } else if (profile.level === 6) {
                [f1Volume, f1Vip] = [64000, 8]
            } else if (profile.level === 7) {
                [f1Volume, f1Vip] = [64000, 8]
            } else {
                [f1Volume, f1Vip] = [0, 0]
            }

            let indicator = { ...res.data, f1Volume, f1Vip }
            setIndicator(indicator)
        }
    }

    const url = () => {
        switch (profile.level) {
            case 1: return require('@images/vip/rank1.png')
            case 2: return require('@images/vip/rank2.png')
            case 3: return require('@images/vip/rank3.png')
            case 4: return require('@images/vip/rank4.png')
            case 5: return require('@images/vip/rank5.png')
            case 6: return require('@images/vip/rank6.png')
            case 7: return require('@images/vip/rank7.png')
            default: return require('@images/vip/rank1.png')
        }
    }

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
        >
            <Box
                alignCenter
                row
                justifyCenter
                paddingBottom={20}
                borderBottomWidth={1}
                borderColor={COLOR.border1}
            >
                <Img
                    source={url()}
                    width={70}
                    height={70}
                    zIndex={1}
                />
                <Box
                    borderWidth={1}
                    borderColor={colors.yellow4}
                    paddingHorizontal={40}
                    paddingVertical={7}
                    radius={10}
                    backgroundColor={colors.black}
                    marginLeft={-20}
                >
                    <Txt size={15} bold color={colors.yellow4}>
                        Level ?
                    </Txt>
                </Box>
            </Box>

            <Box marginTop={20}>
                <Txt size={16} bold>Rank Conditions</Txt>
                <Box row justifySpaceBetween alignCenter marginVertical={10}>
                    <Txt color={colors.gray5} size={15} bold>
                        F1 volume(This Week)
                    </Txt>
                    <Txt color={colors.gray5} size={15} bold>
                        F1 VIP
                    </Txt>
                </Box>
                <Box row justifySpaceBetween alignCenter>
                    <Txt size={16} bold>
                        ${indicator.totalOrderF1} / <Txt bold>${numberWithCommas(indicator.f1Volume || 0)}</Txt>
                    </Txt>
                    <Txt size={16} bold>
                        {indicator.totalMemberVipF1} / <Txt bold>{indicator.f1Vip}</Txt>
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Level