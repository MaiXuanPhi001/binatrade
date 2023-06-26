import { HEIGHT_CHART } from '@screen/Trade/Candlestick'
import { candlesTradingSelector, dPathMATradingSelector } from '@selector/tradingSelector'
import { StyleSheet } from 'react-native'
import { G, Line, Path } from 'react-native-svg'
import { useSelector } from 'react-redux'

const Candles = ({
    GAP_CANDLE,
    WIDTH_CANDLE,
    HEIGHT_SVG,
    HEIGHT_VOLUME,
}) => {
    const candles = useSelector(candlesTradingSelector)
    const dPathMA = useSelector(dPathMATradingSelector)

    return (
        <G key={'G_Candles'}>
            {candles.map((candle, index) => {
                const x_point = GAP_CANDLE * index
                console.log(candle.volumeSVG)
                return (
                    <G key={`G_Candle_Item ${candle.id}`}>
                        {/* <Line
                            key={`G_Candles_Item_L${candle.id}`}
                            x1={x_point}
                            y1={candle.highSVG}
                            x2={x_point}
                            y2={candle.lowSVG}
                            stroke={candle.colorChart}
                            strokeWidth={1}
                        />
                        <Line
                            key={`G_Candles_Item_L2${candle.id}`}
                            x1={x_point}
                            y1={candle.closeSVG}
                            x2={x_point}
                            y2={candle.openSVG}
                            stroke={candle.colorChart}
                            strokeWidth={WIDTH_CANDLE}
                        /> */}

                        <Line
                            key={`G_Candles_Item_Volume${candle.id}`}
                            x1={x_point}
                            y1={HEIGHT_SVG}
                            x2={x_point}
                            y2={candle.volumeSVG}
                            stroke={candle.colorChart}
                            strokeWidth={WIDTH_CANDLE}
                        />
                    </G>
                )
            })}
            <Path
                key={'P_MA5'}
                d={dPathMA.ma5}
                strokeWidth={2.5}
                stroke={'#29a6a7'}
                fill={'none'}
            />
            <Path
                key={'P_MA10'}
                d={dPathMA.ma10}
                strokeWidth={2.5}
                stroke={'#c60e65'}
                fill={'none'}
            />
        </G>
    )
}

export default Candles

const styles = StyleSheet.create({})