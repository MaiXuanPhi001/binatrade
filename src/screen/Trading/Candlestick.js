import Txt from '@commom/Txt';
import { theme } from '@theme/index';
import { height, width } from '@util/responsive';
import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';

const PERCENT_WIDTH = 85
const PADDING_HOZ = 10
export const WIDTH_CHART = (width - PADDING_HOZ) * PERCENT_WIDTH / 100

const PERCENT_HEIGHT = 47.39336492890995
export const HEIGHT_CHART = height * PERCENT_HEIGHT / 100

const Candlestick = ({ trades, times }) => {
    const scrollViewRef = useRef()
    let left = -18
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
                        <View style={styles.viewTime}>
                            {times.map((item, index) => {
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
        width: WIDTH_CHART,
    }
})