import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'

const LoadingSquare = () => {
    return (
        <Box alignCenter>
            <LottieAnimation
                source={require('@lotties/Loading-Square.json')}
                size={70}
            />
        </Box>
    )
}

export default LoadingSquare

const styles = StyleSheet.create({})