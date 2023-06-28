import { numberCommasDot } from '@method/format'
import Modality from '@reuse/Modality'
import { theme } from '@theme/index'
import { height, width } from '@util/responsive'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

const ModalWin = ({ isShow, profit }) => {
    const { t } = useTranslation()
    const scale = useSharedValue(0.3)

    const viewAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value }
            ]
        }
    })

    useMemo(() => {
        if (isShow) {
            scale.value = withSpring(1, {
                damping: 100,
                stiffness: 400,
            }, () => {
                scale.value = withDelay(3000, withSpring(0.3))
            })
        }
    }, [isShow])

    return (
        <Modality
            show={isShow}
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
                    <Text style={styles.txtProfit}>+${numberCommasDot(profit?.toFixed(2))}</Text>
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