import React from 'react'
import Box from '@commom/Box'
import { StyleSheet, View } from 'react-native'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'

const HeaderTableVolStats = () => {
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            justifyCenter
            marginTop={15}
            borderBottomWidth={0.5}
            backgroundColor={theme.colors.drawer}
            borderColor={'#2a2c2e'}
        >
            <Box
                flex={1}
                style={styles.container}
            >
                <Txt style={styles.text}>{t('Time')}</Txt>
                <View style={styles.line} />
            </Box>
            <Box
                flex={1}
                style={styles.container}
            >
                <Txt style={styles.text}>{t('Volume')}</Txt>
                <View style={styles.line} />
            </Box>
        </Box>
    )
}

export default HeaderTableVolStats

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.gray1,
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
    },
    line: {
        backgroundColor: '#17263c',
        width: 1,
        height: 20,
    }
})