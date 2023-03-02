import { StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'

const LoadingWhite = ({ size = 40 }) => {
    return (
        <Box alignCenter>
            <LottieAnimation
                source={require('@lotties/loadingwhite.json')}
                size={size}
            />
        </Box>
    )
}

export default LoadingWhite

const styles = StyleSheet.create({})