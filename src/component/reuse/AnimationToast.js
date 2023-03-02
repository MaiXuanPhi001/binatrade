import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomToast from './CustomToast'
import { toastOrderSelector } from '@selector/orderSelector'
import { useSelector } from 'react-redux'

const AnimationToast = ({ slideAnim }) => {
    const toast = useSelector(toastOrderSelector)

    return (
        <Animated.View
            style={{
                transform: [{ translateY: slideAnim }],
                marginBottom: 25,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
                alignItems: 'center'
            }}
        >
            <CustomToast
                type={toast.type}
                title={toast.title}
            />
        </Animated.View>
    )
}

const Toast = ({ slideAnim }) => {
    const toast = useSelector(toastOrderSelector)

    return (
        <Animated.View
            style={{
                transform: [{ translateY: slideAnim }],
                marginBottom: 25,
                position: 'absolute',
                width: '100%',
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 100,
                padding: 10,
            }}
        >
            <CustomToast
                type={toast.type}
                title={toast.title}
            />
        </Animated.View>
    )
}

export default AnimationToast

const styles = StyleSheet.create({})