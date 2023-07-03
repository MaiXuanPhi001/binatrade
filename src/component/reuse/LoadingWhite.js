import { StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import LottieAnimation from './LottieAnimation'
import { useSelector } from 'react-redux'
import { themeUserSelector } from '@selector/userSelector'

const LoadingWhite = ({ size = 40, marginTop = 0 }) => {
    const theme = useSelector(themeUserSelector)

    return (
        <Box alignCenter marginTop={marginTop}>
            <LottieAnimation
                source={theme === 'dark' ? require('@lotties/loadingwhite.json') :
                    require('@lotties/loadinglight.json')}
                size={size}
            />
        </Box>
    )
}

export default LoadingWhite

const styles = StyleSheet.create({})