import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'

const Profit = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textPercent}>Profit
                <Text style={styles.text95}> 95%</Text>
                <Text style={styles.textProfit}>   $19.50</Text>
            </Text>
        </View>
    )
}

export default Profit

const styles = StyleSheet.create({
    textProfit: {
        fontSize: 18,
        color: theme.colors.greenNen,
    },
    text95: {
        fontSize: 16,
    },  
    textPercent: {
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        alignItems: 'center'
    }
})