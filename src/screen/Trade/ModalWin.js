import { numberCommasDot } from '@method/format'
import Modality from '@reuse/Modality'
import { profitTradeSelector, showModalWinSelector } from '@selector/tradeSelector'
import { theme } from '@theme/index'
import { height, width } from '@util/responsive'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { useSelector } from 'react-redux'

const ModalWin = () => {
    const { t } = useTranslation()
    const show = useSelector(showModalWinSelector)
    const profit = useSelector(profitTradeSelector)
    const scale = useSharedValue(0.3)

    const viewAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value }
            ]
        }
    })

    useMemo(() => {
        if (show) {
            scale.value = withSpring(1, {
                damping: 100,
                stiffness: 400,
            }, () => {
                scale.value = withDelay(3000, withSpring(0.3))
            })
        }
    }, [show])

    return (
        <Modality
            show={show}
            setShow={() => { }}
        >
            <Animated.View style={[styles.container, viewAnimation]}>
                <Animated.Image
                    source={require('@images/trade/result.png')}
                    resizeMode={'contain'}
                    style={[styles.image]}
                />
                <View style={styles.content}>
                    <Text style={styles.txtWin}>{t('Congratulations')}</Text>
                    <Text style={styles.txtProfit}>+${numberCommasDot(profit)}</Text>
                </View>
            </Animated.View>
        </Modality>
    )
}

export default ModalWin

const styles = StyleSheet.create({
    txtProfit: {
        color: theme.colors.lightGreen,
        fontSize: 20,
        fontWeight: 'bold',
    },
    txtWin: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    content: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '95%',
    },
    animatedContainer: {
        width: width,
        height: height,
        position: 'absolute',
    },
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})