import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Img from '@commom/Img'

const Warning = ({ text }) => {
    return (
        <Box row alignCenter marginVertical={5}>
            <Img
                source={require('@images/profile/danger-sign.png')}
                width={20}
                height={20}
                marginRight={10}
            />
            <Txt>{text}</Txt>
        </Box>
    )
}

export default Warning