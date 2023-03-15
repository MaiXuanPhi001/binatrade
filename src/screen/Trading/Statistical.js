import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'
import EvenAndOdd from './EvenAndOdd'

const Statistical = ({dots}) => {
    return (
        <View style={styles.container}>
            <EvenAndOdd dots={dots}/>
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