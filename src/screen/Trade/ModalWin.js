import Modality from '@reuse/Modality'
import { showModalWinSelector } from '@selector/tradeSelector'
import { theme } from '@theme/index'
import { height, width } from '@util/responsive'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useSelector } from 'react-redux'

const ModalWin = () => {
    const show = useSelector(showModalWinSelector)
    const scale = useSharedValue(0.3)

    const viewAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value }
            ]
        }
    })

    useEffect(() => {
        scale.value = withSpring(1, {
            damping: 100,
            stiffness: 400,
        })
    })

    return (
        <Modality
            show={show}
            setShow={() => {}}
        >
            <Animated.View style={[styles.container, viewAnimation]}>
                <Animated.Image
                    source={require('@images/trade/result.png')}
                    resizeMode={'contain'}
                    style={[styles.image]}
                />
                <View style={styles.content}>
                    <Text style={styles.txtWin}>Congratulations</Text>
                    <Text style={styles.txtProfit}>+$9,75</Text>
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