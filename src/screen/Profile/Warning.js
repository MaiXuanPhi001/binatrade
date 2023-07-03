import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'

const Warning = ({ text }) => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box
            row
            marginTop={15}
            marginRight={5}
        >
            <Img
                source={require('@images/profile/warning.png')}
                width={20}
                height={20}
                marginRight={10}
                tintColor={COLOR.iconWarning}
            />
            <Txt color={COLOR.white}>
                {text}
            </Txt>
        </Box>
    )
}

export default Warning