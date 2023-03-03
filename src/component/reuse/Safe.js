import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Box from '@commom/Box'

const Safe = ({
    children,
    bg = 'black',
    paddingHorizontal = 0,
}) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
            <Box
                flex={1}
                // isPaddingAdnroid
                paddingHorizontal={paddingHorizontal}
            >
                {children}
            </Box>
        </SafeAreaView>
    )
}

export default Safe

const styles = StyleSheet.create({})