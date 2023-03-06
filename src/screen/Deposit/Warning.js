import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import React from 'react'

const Warning = ({ text }) => {
    return (
        <Box
            row
            marginTop={15}
            marginRight={5}
        >
            <Img
                source={require('@images/wallet/warning.png')}
                width={20}
                height={20}
                marginRight={10}
            />
            <Txt color={'#7e7e7e'}>{text}</Txt>
        </Box>
    )
}

export default Warning