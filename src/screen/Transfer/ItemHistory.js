import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import { theme } from '@theme/index'

const ItemHistory = ({ history, onShowDetailHistory, t, email }) => {
    const sizeText = 13

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
                <Txt size={sizeText}>{converNetwork(history?.created_at)}</Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                {email === history?.email ?
                    <Txt size={sizeText} bold color='red'>-${history?.amount}</Txt> :
                    <Txt size={sizeText} bold color={theme.colors.lightGreen2}>+${history?.amount}</Txt>
                }
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
                    backgroundColor={'#162311'}
                    borderWidth={1}
                    borderColor={'#274916'}
                >
                    <Txt size={sizeText} color={'#69bd38'}>{t('Success')}</Txt>
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