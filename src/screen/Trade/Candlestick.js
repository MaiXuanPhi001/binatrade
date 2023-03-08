import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CandlestickChart } from 'react-native-wagmi-charts';
import { height, width } from '@util/responsive';
import { useSelector } from 'react-redux';
import { dataTradeSelector } from '@selector/tradeSelector';

const Candlestick = () => {
    const dataTrade = useSelector(dataTradeSelector)

    const PERCENT_WIDTH = 85
    const PADDING_HOZ = 10
    const WIDTH_CHART = (width - PADDING_HOZ) * PERCENT_WIDTH / 100

    const PERCENT_HEIGHT = 47.39336492890995
    const HEIGHT_CHART = height * PERCENT_HEIGHT / 100

    return (
        <View style={styles.container}>
            <CandlestickChart.Provider data={dataTrade}>
                <CandlestickChart
                    width={WIDTH_CHART}
                    height={HEIGHT_CHART}
                >
                    <CandlestickChart.Candles />
                </CandlestickChart>
                {/* <View style={styles.viewTime}>
                    <Text>abc</Text>
                    <Text>abc</Text>
                </View> */}
            </CandlestickChart.Provider>
        </View>
    )
}

export default Candlestick

const styles = StyleSheet.create({
    viewTime: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        // backgroundColor: 'white',
        width: '85%',
    }
})