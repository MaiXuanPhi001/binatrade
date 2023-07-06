import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import { width } from '@util/responsive'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const HEIGHT_BUTTON = 45
const WIDTH_BUTTON = width / 2 - 20
const SIZE = 15

const Tab = ({ tab, setTab, COLOR }) => {
    const { t } = useTranslation()

    return (
        <Box
            row
            marginTop={20}
            marginBottom={30}
            justifySpaceBetween
        >
            {tab === 'open' ?
                <ButtonLiner
                    text={t('Open orders')}
                    height={HEIGHT_BUTTON}
                    width={WIDTH_BUTTON}
                    size={SIZE}
                /> :
                <Btn
                    style={[
                        styles.buttonWallet,
                        { marginLeft: 10, borderColor: COLOR.border2 },
                    ]}
                    onPress={() => setTab('open')}
                >
                    <Txt color={COLOR.white}>{t('Open order')}</Txt>
                </Btn>
            }

            {tab === 'close' ?
                <ButtonLiner
                    text={t('Close orders')}
                    height={HEIGHT_BUTTON}
                    width={WIDTH_BUTTON}
                    size={SIZE}
                /> :
                <Btn
                    style={[
                        styles.buttonWallet,
                        { marginLeft: 10, borderColor: COLOR.border2 },
                    ]}
                    onPress={() => setTab('close')}
                >
                    <Txt color={COLOR.white}>{t('Close orders')}</Txt>
                </Btn>
            }
        </Box>
    )
}

export default Tab

const styles = StyleSheet.create({
    buttonWallet: {
        height: HEIGHT_BUTTON,
        width: WIDTH_BUTTON,
        borderRadius: 10,
        borderWidth: 1,
    }
})