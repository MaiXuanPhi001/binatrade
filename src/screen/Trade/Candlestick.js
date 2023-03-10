import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useRef } from 'react'
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
    const scrollViewRef = useRef()

    let left = -18

    return (
        <View style={styles.container}>
            <CandlestickChart.Provider data={dataTrade}>
                <ScrollView
                    horizontal
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
                >
                    <View>
                        <CandlestickChart
                            // width={WIDTH_CHART}
                            width={dataTrade.length * 16}
                            height={HEIGHT_CHART}
                            style={styles.candlestick}
                        >
                            <CandlestickChart.Candles
                                // positiveColor={theme.colors.greenNen}
                                // negativeColor={theme.colors.redNen}
                            />
                        </CandlestickChart>

                        <View style={styles.viewTime}>
                            {listTime.map((item, index) => {
                                left += 31
                                if (index % 2 !== 0) return
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
                    </View>
                </ScrollView>
            </CandlestickChart.Provider>
        </View>
    )
}

export default Candlestick

const styles = StyleSheet.create({
    candlestick: {
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    viewTime: {
        flexDirection: 'row',
        height: 40,
    },
    container: {
        // backgroundColor: 'white',
        width: WIDTH_CHART,
    }
})