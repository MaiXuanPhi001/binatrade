import { Text } from 'react-native'
import React from 'react'

const TextClose = ({ value, top }) => {
    return (
        <Text
            style={{
                color: 'white',
                fontSize: 10,
                position: 'absolute',
                top: top,
            }}
            numberOfLines={1}
        >
            -{value?.toFixed(2)}
        </Text>
    )
}

export default TextClose