import { StyleSheet, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import ProgressBar from 'react-native-progress/Bar'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { useSelector } from 'react-redux'
import { buyerTradeSelector, dataTradeSelector, sellerTradeSelector, timeTradeSelector } from '@selector/tradeSelector'

const PercentBuyAndSell = () => {
    const time = useSelector(timeTradeSelector)
    const dataTrade = useSelector(dataTradeSelector)
    const buyer = useSelector(buyerTradeSelector)
    const seller = useSelector(sellerTradeSelector)

    const [buy, setBuy] = useState(buyer)
    const [sell, setSell] = useState(seller)  

    useMemo(() => {
        if (dataTrade.length > 0) {
            const lastChart = dataTrade[dataTrade.length - 1]
            if (time > 0 && time < 32 && lastChart.buyer) {
                setBuy(lastChart.buyer)
                setSell(lastChart.seller)
            }
        }
    }, [time, buyer, seller])

    return (
        <View style={styles.container}>
            <ProgressBar
                progress={(buy * 100 / (buy + sell)).toFixed(1) / 100 || 0}
                width={300}
                color={'#1BBD61'}
                unfilledColor={'#E93555'}
                height={5}
                borderRadius={5}
                borderWidth={0}
            />
            <View style={styles.content}>
                <Txt color={theme.colors.greenNen} bold size={12}>{(buy * 100 / (buy + sell)).toFixed(1) || 0}%</Txt>
                <Txt color={theme.colors.redNen} bold size={12}>{(sell * 100 / (sell + buy)).toFixed(1) || 0}%</Txt>
            </View>
        </View>
    )
}

export default PercentBuyAndSell

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        position: 'absolute',
        left: -135,
        top: 150,
        transform: [
            { rotate: '90deg' },
        ],
        // backgroundColor: 'red',
        // width:0,
        // height: 50,
    },
})