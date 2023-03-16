import { Image, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react'
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { theme } from '@theme/index'
import { TextInput } from 'react-native-gesture-handler'
import { height, width } from '@util/responsive'

const ToastOrder = forwardRef((_, ref) => {
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
    const start = -(width * 89 / 100)
    const rightPosition = useSharedValue(start)
    const background = useSharedValue(theme.colors.greenNen)
    const message = useSharedValue('')

    const viewStyle = useAnimatedStyle(() => {
        return {
            right: rightPosition.value,
            backgroundColor: background.value,
        }
    })

    const textProps = useAnimatedProps(() => {
        return {
            text: `${message.value}`,
        }
    })

    const slide = useCallback((text, status) => {
        'worklet'
        message.value = text
        background.value = status ? theme.colors.greenNen : theme.colors.redNen 
        rightPosition.value = withSpring(0, {
            damping: 100,
            stiffness: 400,
        }, () => {
            rightPosition.value = withDelay(1500, withSpring(start))
        })
    }, [])

    useImperativeHandle(
        ref,
        () => ({
            slide,
        }),
        [slide]
    )

    return (
        <Animated.View style={[styles.animatedContainer, viewStyle]}>
            <Image
                source={require('@images/trade/tick.png')}
                style={styles.image}
            />
            <AnimatedTextInput
                style={styles.labelText}
                defaultValue=''
                animatedProps={textProps}
                editable={false}
            />
        </Animated.View>
    )
})

export default memo(ToastOrder)

const styles = StyleSheet.create({
    labelText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    animatedContainer: {
        flexDirection: 'row',
        position: 'absolute',
        width: width * 85 / 100,
        right: -(width * 89 / 100),
        top: -(height * 71 / 100),
        backgroundColor: theme.colors.greenNen,
        padding: 0,
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
    }
})