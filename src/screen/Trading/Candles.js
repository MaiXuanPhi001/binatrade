import { timeHM } from '@method/date'
import { numberCommasDot } from '@method/format'
import { candlesTradingSelector, dPathMATradingSelector, timeTradingSelector } from '@selector/tradingSelector'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { StyleSheet } from 'react-native'
import { G, Line, Path, Rect, Text as TextSVG } from 'react-native-svg'
import { useSelector } from 'react-redux'

const PADDING_BOTTOM = 20
const HEIGH_SLIDER = 250

const Candles = ({
    GAP_CANDLE,
    WIDTH_CANDLE,
    WIDTH_CANDLES,
    HEIGHT_SVG,
    SIZE_CHART,
    PADDING_TOP,
}) => {
    const candles = useSelector(candlesTradingSelector)
    const dPathMA = useSelector(dPathMATradingSelector)
    const time = useSelector(timeTradingSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

    const lastChart = candles[candles.length - 1]
    const timeCovert = time > 30 ? 61 - time : 31 - time
    const buyerPercent = lastChart?.buyer * 100 / (lastChart?.buyer + lastChart?.seller)
    const buyerSVG = HEIGH_SLIDER * buyerPercent / 100
    const sellerPercent = lastChart?.seller * 100 / (lastChart?.buyer + lastChart?.seller)

    return (
        <G key={'G_Candles'}>
            <Line
                key={`G_Candles_Item_Line_Last_Candes`}
                x1={GAP_CANDLE * (SIZE_CHART - 1)}
                y1={PADDING_TOP}
                x2={GAP_CANDLE * (SIZE_CHART - 1)}
                y2={HEIGHT_SVG - PADDING_BOTTOM}
                stroke={COLOR.white}
                strokeWidth={1}
                strokeDasharray={'6 6'}
            />

            {candles.map((candle, index) => {
                const x_point = GAP_CANDLE * index
                let closeSVG = candle.closeSVG
                if (Math.abs(candle.closeSVG - candle.openSVG) < 2) {
                    closeSVG = candle.openSVG + 2
                } 

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
                            y1={closeSVG}
                            x2={x_point}
                            y2={candle.openSVG}
                            stroke={candle.colorChart === 'white' ? COLOR.white : candle.colorChart}
                            strokeWidth={WIDTH_CANDLE}
                        />

                        <Line
                            key={`G_Candles_Item_Volume${candle.id}`}
                            x1={x_point}
                            y1={HEIGHT_SVG - PADDING_BOTTOM}
                            x2={x_point}
                            y2={candle.volumeSVG - PADDING_BOTTOM}
                            stroke={candle.colorChart === 'white' ? COLOR.white : candle.colorChart}
                            strokeWidth={WIDTH_CANDLE}
                        />
                        {index % 5 === 0 &&
                            <TextSVG
                                key={`G_Candles_Item_Time${index}`}
                                fill={colors.brown2}
                                textAnchor={'middle'}
                                fontWeight={'bold'}
                                x={x_point}
                                y={HEIGHT_SVG - 5}
                            >
                                {timeHM(candle.timestamp)}
                            </TextSVG>
                        }
                    </G>
                )
            })}
            <Line
                key={`G_Candles_Line_Bottom_Volume`}
                x1={0}
                y1={HEIGHT_SVG - PADDING_BOTTOM}
                x2={WIDTH_CANDLES}
                y2={HEIGHT_SVG - PADDING_BOTTOM}
                stroke={colors.brown2}
                strokeWidth={0.5}
            />
            <Line
                key={`G_Candles_Line_Close`}
                x1={0}
                y1={lastChart?.closeSVG}
                x2={width}
                y2={lastChart?.closeSVG}
                stroke={COLOR.white}
                strokeWidth={0.5}
            />

            <Rect
                key={`G_Candles_Rect_Close`}
                x={WIDTH_CANDLES + 5}
                y={lastChart?.closeSVG - 20}
                fill={colors.sky}
                height={20}
                width={200}
            />

            <TextSVG
                key={`G_LineX_Text_Close`}
                x={width - 15}
                fill={colors.white}
                y={lastChart?.closeSVG - 5}
                textAnchor={'end'}
                fontSize={12}
                fontWeight={'bold'}
            >
                {numberCommasDot(lastChart?.close?.toFixed(2))}
            </TextSVG>

            <Rect
                key={`G_Candles_Rect_Time`}
                x={width - 60}
                y={lastChart?.closeSVG + 2}
                fill={colors.sky}
                height={20}
                width={50}
            />

            <TextSVG
                key={`G_LineX_Text_Time`}
                x={width - 15}
                fill={colors.white}
                y={lastChart?.closeSVG + 16}
                textAnchor={'end'}
                fontSize={12}
                fontWeight={'bold'}
            >
                {`00:${timeCovert >= 10 ? timeCovert : '0' + timeCovert}`}
            </TextSVG>

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

            <TextSVG
                key={`G_LineX_Text_Buyer`}
                x={5}
                y={10}
                fill={colors.greenCan}
                textAnchor={'start'}
                fontSize={11}
            >
                {isNaN(buyerPercent) ? '0%' :
                    buyerPercent?.toFixed(1) + '%'}
            </TextSVG>

            <Rect
                key={`G_Candles_Rect_Seller`}
                x={5}
                y={20}
                fill={colors.red3}
                height={HEIGH_SLIDER}
                width={8}
                rx={5}
            />

            <Rect
                key={`G_Candles_Rect_Buyer`}
                x={5}
                y={20}
                fill={colors.greenCan}
                height={buyerSVG}
                width={8}
                rx={5}
            />

            <TextSVG
                key={`G_LineX_Text_Seller`}
                x={5}
                y={HEIGH_SLIDER + 35}
                fill={colors.red3}
                textAnchor={'start'}
                fontSize={11}
            >
                {isNaN(buyerPercent) ? '0%' :
                    sellerPercent?.toFixed(1) + '%'}
            </TextSVG>
        </G>
    )
}

export default Candles

const styles = StyleSheet.create({})