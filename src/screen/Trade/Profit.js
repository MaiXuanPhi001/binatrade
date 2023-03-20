import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'
import { useSelector } from 'react-redux'
import { profitTradeSelector } from '@selector/tradeSelector'
import { useTranslation } from 'react-i18next'

const Profit = () => {
    const { t } = useTranslation()
    const profit = useSelector(profitTradeSelector)

    return (
        <View style={styles.container}>
            <Text style={styles.textPercent}>{t('Profit')}
                <Text style={styles.text95}> 95%</Text>
                <Text style={styles.textProfit}>   ${profit.toFixed(2)}</Text>
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