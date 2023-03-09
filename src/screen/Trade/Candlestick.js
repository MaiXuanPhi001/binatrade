import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { CandlestickChart } from 'react-native-wagmi-charts';
import { height, width } from '@util/responsive';
import { useSelector } from 'react-redux';
import { dataTradeSelector, listTimeTradeSelector } from '@selector/tradeSelector';
import Txt from '@commom/Txt';

const PERCENT_WIDTH = 85
const PADDING_HOZ = 10
export const WIDTH_CHART = (width - PADDING_HOZ) * PERCENT_WIDTH / 100

const PERCENT_HEIGHT = 47.39336492890995
export const HEIGHT_CHART = height * PERCENT_HEIGHT / 100

const Candlestick = () => {
    const dataTrade = useSelector(dataTradeSelector)
    const listTime = useSelector(listTimeTradeSelector)

    let left = -45

    return (
        <View style={styles.container}>
            <CandlestickChart.Provider data={dataTrade}>
                <CandlestickChart
                    width={WIDTH_CHART}
                    height={HEIGHT_CHART}
                >
                    <CandlestickChart.Candles />
                </CandlestickChart>
                <View style={styles.viewTime}>
                    {listTime.slice(3, listTime.length).map(item => {
                        left += 39
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    position: 'absolute',
                                    left: left,
                                    marginTop: 3,
                                }}
                                key={Math.random()}
                            >
                                <Txt size={10}>{item}</Txt>
                            </View>
                        )
                    })}
                </View>
            </CandlestickChart.Provider>
        </View>
    )
}

export default Candlestick

const styles = StyleSheet.create({
    viewTime: {
        flexDirection: 'row',
        // height: 40,
    },
    container: {
        // backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white',
        width: WIDTH_CHART,
    }
})