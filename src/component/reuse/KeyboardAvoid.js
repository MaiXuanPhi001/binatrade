import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'

const KeyboardAvoid = ({
    children,
    bg = 'black'
}) => {
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}
            behavior="padding"
            enabled
            style={{
                flex: 1,
                backgroundColor: bg
            }}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoid

const styles = StyleSheet.create({})