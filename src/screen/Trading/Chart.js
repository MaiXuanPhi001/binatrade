import { StyleSheet, View } from 'react-native'
import React from 'react'
import Candlestick from './Candlestick'
import Line from './Line'
import Close from './Close'
import PercentBuyAndSell from './PercentBuyAndSell'

const Chart = ({ trades, highChart, lowChart, times }) => {
    return (
        <View style={styles.container}>
            <View>
                <Line
                    trades={trades}
                    highChart={highChart}
                    lowChart={lowChart}
                />
                <Candlestick
                    trades={trades}
                    times={times}
                />
                {/* <PercentBuyAndSell
                
                /> */}
            </View>
            <Close
                trades={trades}
                highChart={highChart}
                lowChart={lowChart}
            />
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({
    container: {
        height: '58%',
        flexDirection: 'row',
        marginTop: 10,
    }
})