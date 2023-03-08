import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-wagmi-charts';
import { height } from '@util/responsive';

const Line = () => {
    const data = [
        {
            timestamp: 1625945400000,
            value: 100,
        },
        {
            timestamp: 1625946300000,
            value: 200,
        }
    ]

    const PERCENT_HEIGHT = 47.39336492890995
    const HEIGHT_CHART = height * PERCENT_HEIGHT / 100

    return (
        <View style={styles.container}>
            <LineChart.Provider data={data}>
                <LineChart height={HEIGHT_CHART + 13}>
                    <LineChart.Path color='white' width={0} >
                        {/* {chart[chart.length - 1]?.close &&
                            <LineChart.HorizontalLine
                                at={{ value: chart[chart.length - 1]?.close }}
                                color={side === 'buy' ? '#1BBD61' : side === 'sell' ? 'red' : 'yellow'}
                            />
                        } */}

                        <LineChart.HorizontalLine
                            at={{ value: 200 }}
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