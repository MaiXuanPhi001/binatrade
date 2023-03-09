import { StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'

const LoadingWhite = ({ size = 40, marginTop = 0 }) => {
    return (
        <Box alignCenter marginTop={marginTop}>
            <LottieAnimation
                source={require('@lotties/loadingwhite.json')}
                size={size}
            />
        </Box>
    )
}

export default LoadingWhite

const styles = StyleSheet.create({})