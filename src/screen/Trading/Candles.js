import { candlesTradingSelector } from '@selector/tradingSelector'
import { StyleSheet } from 'react-native'
import { G, Line } from 'react-native-svg'
import { useSelector } from 'react-redux'

const Candles = ({ GAP_CANDLE, WIDTH_CANDLE }) => {
    const candles = useSelector(candlesTradingSelector)

    return (
        <G key={'G_Candles'}>
            {candles.map((candle, index) => {
                const x_point = GAP_CANDLE * index

                return (
                    <G key={`G_Candle_Item ${candle.id}`}>
                        <Line
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
                        />
                    </G>
                )
            })}
        </G>
    )
}

export default Candles

const styles = StyleSheet.create({})