import { StyleSheet, View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-wagmi-charts';
import { HEIGHT_CHART, WIDTH_CHART } from './Candlestick';
import { useSelector } from 'react-redux';
import { dataTradeSelector, highChartTradeSelector, lowChartTradeSelector } from '@selector/tradeSelector';
import { theme } from '@theme/index';

const Line = () => {
    const dataTrade = useSelector(dataTradeSelector)
    const highChart = useSelector(highChartTradeSelector)
    const lowChart = useSelector(lowChartTradeSelector)

    const data = [
        {
            timestamp: 1625945400000,
            value: lowChart,
        },
        {
            timestamp: 1625946300000,
            value: highChart,
        }
    ]

    const close = dataTrade.length > 0 && dataTrade[dataTrade.length - 1].close
    const lineThree = (highChart - lowChart) / 2 + lowChart
    const lineFour = (lineThree - lowChart) / 2 + lowChart
    const lineTwo = (highChart - lineThree) / 2 + lineThree

    return (
        <View style={styles.container}>
            <LineChart.Provider data={data}>
                <LineChart
                    height={HEIGHT_CHART + 13}
                    width={WIDTH_CHART}
                >
                    <LineChart.Path color='white' width={0} >
                        <LineChart.HorizontalLine
                            at={{ value: highChart }}
                            color={theme.colors.gray}
                        />
                        <LineChart.HorizontalLine
                            at={{ value: lineTwo }}
                            color={theme.colors.gray}
                        />
                        <LineChart.HorizontalLine
                            at={{ value: lineThree }}
                            color={theme.colors.gray}
                        />
                        <LineChart.HorizontalLine
                            at={{ value: lineFour }}
                            color={theme.colors.gray}
                        />
                        <LineChart.HorizontalLine
                            at={{ value: lowChart }}
                            color={theme.colors.gray}
                        />
                        <LineChart.HorizontalLine
                            at={{ value: close }}
                            color={'yellow'}
                        />
                    </LineChart.Path>
                </LineChart>
            </LineChart.Provider>
        </View>
    )
}

export default Line

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // backgroundColor: 'red',
        // zIndex: 1,
        top: -6
    }
})