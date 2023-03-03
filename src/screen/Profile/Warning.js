import React from 'react'
import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'

const Warning = ({ text }) => {
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
            />
            <Txt>{text}</Txt>
        </Box>
    )
}

export default Warning