import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'

const Level = () => {
    const COLOR = colors[useSelector(themeUserSelector)]
    const profile = useSelector(profileSelector)

    const url = () => {
        switch (profile.level) {
            case 1 : return require('@images/vip/rank1.png')
            case 2 : return require('@images/vip/rank2.png')
            case 3 : return require('@images/vip/rank3.png')
            case 4 : return require('@images/vip/rank4.png')
            case 5 : return require('@images/vip/rank5.png')
            case 6 : return require('@images/vip/rank6.png')
            case 7 : return require('@images/vip/rank7.png')
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
                        $60 / <Txt bold>$ 2,000</Txt>
                    </Txt>
                    <Txt size={16} bold>
                        0 / <Txt bold>3</Txt>
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Level