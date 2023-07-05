import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { Svg } from 'react-native-svg'
import { useSelector } from 'react-redux'

const PADDING = 60
const WIDTH_SVG = width - PADDING
const HEIGH_SVG = 230

const ThisMonth = () => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box>
            <Txt size={15} color={colors.blueGreen} bold>
                Total new referrals(0)
            </Txt>
            <Txt size={15} bold color={colors.sky} marginVertical={10}>
                Total new agencies(0)
            </Txt>

            <Svg
                style={{
                    borderWidth: 1,
                    borderColor: COLOR.border1,
                    borderRadius: 10,
                    backgroundColor: '#011022'
                }}
                width={WIDTH_SVG} 
                height={HEIGH_SVG}
            >

            </Svg>
        </Box>
    )
}

export default ThisMonth