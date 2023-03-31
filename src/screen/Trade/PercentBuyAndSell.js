import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Txt from '@commom/Txt'
import { candlesTradeSelector, orderTradeSelector, timeTradeSelector } from '@selector/tradeSelector'
import tradeSlice from '@slice/tradeSlice'
import { theme } from '@theme/index'
import { useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ProgressBar from 'react-native-progress/Bar'
import { useDispatch, useSelector } from 'react-redux'

const PercentBuyAndSell = () => {
    const dispatch = useDispatch()
    const time = useSelector(timeTradeSelector)
    const candles = useSelector(candlesTradeSelector)
    const order = useSelector(orderTradeSelector)

    // const buyer = useSelector(buyerTradeSelector)
    // const seller = useSelector(sellerTradeSelector)

    const [buy, setBuy] = useState(0)
    const [sell, setSell] = useState(0)

    useMemo(() => {
        if (candles.length > 0) {
            const lastChart = candles[candles.length - 1]
            if (time > 0 && time < 32) {
                setBuy(lastChart.buyer)
                setSell(lastChart.seller)
            }
            if (time === 2 && order.amountTotal > 0) {
                const penultimate = candles[candles.length - 2]
                if ((order.side === 'buy' && penultimate.close > penultimate.open) ||
                    (order.side === 'sell' && penultimate.close < penultimate.open)) {
                    dispatch(tradeSlice.actions.setShowModalWin())
                    setTimeout(() => {
                        dispatch(tradeSlice.actions.resetOrder())
                        dispatch(getProfileThunk())
                    }, 3000)
                } else {
                    dispatch(tradeSlice.actions.resetOrder())
                }
            }
        }
    }, [time])

    return (
        <View style={styles.container}>
            <ProgressBar
                progress={buy !== 0 ? (buy * 100 / (buy + sell)).toFixed(1) / 100 : 0.5}
                width={300}
                color={'#1BBD61'}
                unfilledColor={'#E93555'}
                height={5}
                borderRadius={5}
                borderWidth={0}
            />
            <View style={styles.content}>
                <Txt color={theme.colors.greenNen} bold size={12}>{buy !== 0 ? (buy * 100 / (buy + sell)).toFixed(1) : 0}%</Txt>
                <Txt color={theme.colors.redNen} bold size={12}>{sell !== 0 ? (sell * 100 / (sell + buy)).toFixed(1) : 0}%</Txt>
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
    },
})