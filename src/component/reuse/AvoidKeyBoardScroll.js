import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Scroll from '@commom/Scroll'
import KeyboardAvoid from './KeyboardAvoid'

const AvoidKeyBoardScroll = ({
    children,
    bg,
    paddingHorizontal = 0,
}) => {
    return (
        <KeyboardAvoid bg={bg}>
            <SafeAreaView style={{ flex: 1 }}>
                <Scroll
                    flexGrow={1}
                    paddingHorizontal={paddingHorizontal}
                >
                    {children}
                </Scroll>
            </SafeAreaView>
        </KeyboardAvoid>
    )
}

export default AvoidKeyBoardScroll

const styles = StyleSheet.create({})