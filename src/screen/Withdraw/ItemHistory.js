import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import Btn from '@commom/Btn'
import Img from '@commom/Img'

export const THEME = {
    SUCCESS: {
        text: 'Success',
        color: '#69bd38',
        border: '#274916',
        background: '#162311',
    },
    CANCEL: {
        text: 'Cancell',
        color: '#e74848',
        border: '#58181c',
        background: '#2a1215',
    },
}

const ItemHistory = ({ history, onShowDetailHistory, t }) => {
    const sizeText = 13

    const status = history?.status === 1 ? THEME.SUCCESS : THEME.CANCEL 

    return (
        <Box
            row
            alignCenter
            height={45}
            borderBottomWidth={0.5}
            borderColor={'#2a2c2e'}
        >
            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText}>{converNetwork(history?.network)}</Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText} bold>$ {history?.amount}</Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Box
                    alignSelf={'flex-start'}
                    alignCenter
                    justifyCenter
                    padding={3}
                    radius={5}
                    backgroundColor={status.background}
                    borderWidth={1}
                    borderColor={status.border}
                >
                    <Txt size={sizeText} color={status.color}>{t(status.text)}</Txt>
                </Box>
            </Box>

            <Box
                alignCenter
                width={'13%'}
            >
                <Btn onPress={() => onShowDetailHistory(history)}>
                    <Img
                        source={require('@images/wallet/next.png')}
                        width={20}
                        height={20}
                    />
                </Btn>
            </Box>
        </Box>
    )
}

export default ItemHistory