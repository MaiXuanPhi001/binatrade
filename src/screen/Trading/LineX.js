import { numberWithCommas } from '@method/format'
import { heighValueChartTradingSelector, maxHighItemTradingSelector } from '@selector/tradingSelector'
import { colors } from '@theme/colors'
import { G, Line, Text as TextSVG } from 'react-native-svg'
import { useSelector } from 'react-redux'

const SIZE = 5

const LineX = ({
    HEIGHT_CANLES,
    PADDING_TOP,
    WIDTH_CANDLES,
}) => {
    const maxHighItem = useSelector(maxHighItemTradingSelector)
    const heighValueChart = useSelector(heighValueChartTradingSelector)

    return (
        <G key={`G_LineX`}>
            {Array.from(new Array(SIZE)).map((_, index) => {
                let gap_x_line = (HEIGHT_CANLES / (SIZE - 1) * index) + PADDING_TOP
                const textValue = Number(maxHighItem?.high) - (heighValueChart / (SIZE - 1)) * index

                return (
                    <G key={`G_LineX_G_${index}`}>
                        <Line
                            key={`G_LineX_LINE${index}`}
                            x1={0}
                            y1={gap_x_line}
                            x2={WIDTH_CANDLES}
                            y2={gap_x_line}
                            stroke={colors.brown}
                            strokeWidth={1}
                            strokeDasharray={'6 6'}
                        />
                        <TextSVG
                            key={`G_LineX_Text${index}`}
                            x={WIDTH_CANDLES + 10}
                            fill={colors.white}
                            y={gap_x_line}
                            textAnchor={'start'}
                            fontSize={12}
                            fontWeight={'bold'}
                        >
                            {numberWithCommas(textValue.toFixed(0))}
                        </TextSVG>
                    </G>
                )
            })}
        </G>
    )
}

export default LineX