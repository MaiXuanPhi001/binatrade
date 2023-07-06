import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import { StyleSheet } from 'react-native'
import { BEP20, TRC20 } from './FormWithdraw'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import { themeUserSelector } from '@selector/userSelector'
const HEIGHT_BUTTON = 35
const WIDTH_BUTTON = 80
const SIZE = 14

const WalletType = ({ wallet, setWallet, t }) => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box row marginTop={20} marginBottom={30}>
            {wallet === BEP20 ?
                <ButtonLiner
                    text={t('BEP20')}
                    height={HEIGHT_BUTTON}
                    width={WIDTH_BUTTON}
                    size={SIZE}
                /> :
                <Btn
                    style={[
                        styles.buttonWallet,
                        { marginLeft: 10, borderColor: COLOR.border2 },
                    ]}
                    onPress={() => setWallet(BEP20)}
                >
                    <Txt color={COLOR.white}>{t('BEP20')}</Txt>
                </Btn>
            }

            {wallet === TRC20 ?
                <ButtonLiner
                    text={t('TRC20')}
                    height={HEIGHT_BUTTON}
                    width={WIDTH_BUTTON}
                    size={SIZE}
                /> :
                <Btn
                    style={[
                        styles.buttonWallet,
                        { marginLeft: 10, borderColor: COLOR.border2 },
                    ]}
                    onPress={() => setWallet(TRC20)}
                >
                    <Txt color={COLOR.white}>{t('TRC20')}</Txt>
                </Btn>
            }
        </Box>
    )
}

export default WalletType

const styles = StyleSheet.create({
    buttonWallet: {
        height: HEIGHT_BUTTON,
        width: WIDTH_BUTTON,
        borderRadius: 10,
        borderWidth: 1,
    }
})