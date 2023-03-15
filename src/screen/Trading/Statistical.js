import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'

const Statistical = () => {
    return (
        <View style={styles.container}>
            <Text>Statistical</Text>
        </View>
    )
}

export default Statistical

const styles = StyleSheet.create({
    container: {
        height: '19%',
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderColor: theme.colors.gray,
        paddingTop: 5
    }
})