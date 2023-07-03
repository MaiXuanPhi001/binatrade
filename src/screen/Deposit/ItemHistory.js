import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import { colors } from '@theme/colors'

const ItemHistory = ({ history, onShowDetailHistory, t, COLOR }) => {
    const sizeText = 13

    return (
        <Box
            row
            alignCenter
            height={45}
            borderBottomWidth={0.5}
            borderColor={COLOR.gray}
        >
            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText} color={COLOR.white}>
                    {converNetwork(history?.coin_key)}
                </Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    $ {history?.amount}
                </Txt>
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
                    backgroundColor={colors.green2}
                >
                    <Txt size={sizeText} color={'white'} bold>{t('Success')}</Txt>
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
                        tintColor={COLOR.white3}
                    />
                </Btn>
            </Box>
        </Box>
    )
}

export default ItemHistory