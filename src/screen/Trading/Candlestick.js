import { height, width } from '@util/responsive';
import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

const PERCENT_WIDTH = 85
const PADDING_HOZ = 10
export const WIDTH_CHART = (width - PADDING_HOZ) * PERCENT_WIDTH / 100

const PERCENT_HEIGHT = 47.39336492890995
export const HEIGHT_CHART = height * PERCENT_HEIGHT / 100

const Candlestick = ({ trades }) => {
    const scrollViewRef = useRef()
    return (
        <View style={styles.container}>
            <CandlestickChart.Provider data={trades}>
                <ScrollView
                    horizontal
                    ref={scrollViewRef}
                    // scrollEnabled={false}
                    onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
                >
                    <View>
                        <CandlestickChart
                            // width={WIDTH_CHART}
                            width={trades.length * 16}
                            height={HEIGHT_CHART}
                            style={styles.candlestick}
                        >
                            <CandlestickChart.Candles
                            // positiveColor={theme.colors.greenNen}
                            // negativeColor={theme.colors.redNen}
                            />
                        </CandlestickChart>
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
        width: WIDTH_CHART,
    }
})