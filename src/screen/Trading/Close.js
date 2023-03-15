import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HEIGHT_CHART } from './Candlestick'
import CloseValue from './CloseValue'
import Pointer from './Pointer'

const Close = ({ trades, highChart, lowChart }) => {
    const close = trades.length > 0 && trades[trades.length - 1].close
    const percent = trades.length > 0 && (highChart - close) * 100 / (highChart - lowChart)
    const top = trades.length > 0 && (HEIGHT_CHART - 15) * percent / 100

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