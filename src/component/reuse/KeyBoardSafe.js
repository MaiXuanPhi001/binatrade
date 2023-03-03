import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { theme } from '@theme/index'

const KeyBoardSafe = ({
    children,
    bg = theme.colors.background,
    paddingBottom = 500,
}) => {
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}
            behavior='padding'
            enabled
            style={{
                flex: 1,
                backgroundColor: bg,
            }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Box
                    flex={1}
                // isPaddingAdnroid
                >
                    <Scroll
                        flexGrow={1}
                        paddingBottom={paddingBottom}
                    >
                        {children}
                    </Scroll>
                </Box>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default KeyBoardSafe