import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import { theme } from '@theme/index'
import { StyleSheet } from 'react-native'
import { BEP20, TRC20 } from './FormWithdraw'
const HEIGHT_BUTTON = 35
const WIDTH_BUTTON = 80
const SIZE = 14

const WalletType = ({ wallet, setWallet, t }) => {
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
                    style={[styles.buttonWallet, { marginRight: 10 }]}
                    onPress={() => setWallet(BEP20)}
                >
                    <Txt>{t('BEP20')}</Txt>
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
                    style={[styles.buttonWallet, { marginLeft: 10 }]}
                    onPress={() => setWallet(TRC20)}
                >
                    <Txt>{t('TRC20')}</Txt>
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
        borderColor: theme.colors.gray4,
    }
})