import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Img from '@commom/Img'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import { themeUserSelector } from '@selector/userSelector'

const Warning = ({ text }) => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box row alignCenter marginVertical={5}>
            <Img
                source={require('@images/profile/danger-sign.png')}
                width={20}
                height={20}
                marginRight={10}
            />
            <Txt color={COLOR.white}>{text}</Txt>
        </Box>
    )
}

export default Warning