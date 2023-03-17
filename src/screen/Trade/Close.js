import { candlesTradeSelector, highChartTradeSelector, lowChartTradeSelector } from '@selector/tradeSelector'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { HEIGHT_CHART } from './Candlestick'
import CloseValue from './CloseValue'
import Pointer from './Pointer'

const Close = () => {
    const highChart = useSelector(highChartTradeSelector)
    const lowChart = useSelector(lowChartTradeSelector)
    const candles = useSelector(candlesTradeSelector)

    const close = candles.length > 0 && candles[candles.length - 1].close
    const percent = candles.length > 0 && (highChart - close) * 100 / (highChart - lowChart)
    const top = candles.length > 0 && (HEIGHT_CHART - 15) * percent / 100

    return (
        <View style={styles.container}>
            <CloseValue
                highChart={highChart}
                lowChart={lowChart}
            />
            <Pointer 
                close={close}
                top={top}
            />
        </View>
    )
}

export default Close

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HEIGHT_CHART,
        borderLeftWidth: 1,
        borderColor: 'white',
    }
})