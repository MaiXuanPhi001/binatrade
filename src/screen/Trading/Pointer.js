import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const Pointer = ({ close, top }) => {
    const topAnimation = useSharedValue(20)

    const animationStyle = useAnimatedStyle(() => {
        return {
            top: topAnimation.value
        }
    })

    topAnimation.value = withSpring(top, {
        damping: 100,
        stiffness: 400,
    })

    return (
        <View style={styles.container}>
            <Animated.View
                style={[{
                    backgroundColor: 'yellow',
                    borderRadius: 3,
                    alignItems: 'center',
                    padding: 2,
                    position: 'absolute',
                    marginLeft: 2,
                    width: '100%',
                }, animationStyle]}
            >
                <Text style={styles.textClose} numberOfLines={1}>{close && close?.toFixed(2)}</Text>
            </Animated.View>
        </View>
    )
}

export default Pointer

const styles = StyleSheet.create({
    textClose: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    }
})