import React from 'react'
import Txt from '@commom/Txt'

const TextError = ({ text }) => {
    return (
        <Txt color={'red'} marginTop={10}>{text}</Txt>
    )
}

export default TextError
