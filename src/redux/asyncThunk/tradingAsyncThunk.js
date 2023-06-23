import { createAsyncThunk } from "@reduxjs/toolkit"
import { getChart } from "@service/tradeService"
import { colors } from "@theme/colors"

export const getChartThunk =
    createAsyncThunk('trading/getChartThunk', async (data) => {
        const res = await getChart(data.symbol)
        if (res.status) {
            let array = res.data
            let candles = array.slice(array.length - data.size_chart, array.length)

            let [maxHighItem, minLowItem] =
                [{ high: Number.MIN_SAFE_INTEGER }, { low: Number.MAX_SAFE_INTEGER }]

            for (let i = 0; i < candles.length; i++) {
                maxHighItem = candles[i].high >= maxHighItem.high ?
                    { ...candles[i], position: i } : maxHighItem

                minLowItem = candles[i].low <= minLowItem.low ?
                    { ...candles[i], position: i } : minLowItem
            }

            const heighChart = maxHighItem.high - minLowItem.low
            maxHighItem.high = Number(maxHighItem.high) + (heighChart / 4)
            minLowItem.low = minLowItem.low - (heighChart / 10)
            const heighValueChart = maxHighItem.high - minLowItem.low
            const section = data.heigh_candle / heighValueChart

            let [dPathMA5, dPathMA10] = ['', '']

            candles = candles.map((item, index) => {
                let highSVG = data.heigh_candle - ((item.high - minLowItem.low) * section)

                let lowSVG = data.heigh_candle - ((item.low - minLowItem.low) * section)
                let closeSVG = data.heigh_candle - ((item.close - minLowItem.low) * section)
                let openSVG = data.heigh_candle - ((item.open - minLowItem.low) * section)
                let colorChart =
                    Number(item.close) >= Number(item.open) ? colors.greenCan : colors.red3

                // let [ma5, ma10] = [0, 0]
                // for (let i = (index + req.max_size); i > (index + req.max_size - 99); i--) {
                //     const close = Number(array[i].close)
                //     ma99 += close
                //     if ((index + req.max_size - i) < 7) ma7 += close
                //     if ((index + req.max_size - i) < 25) ma25 += close
                // }
                // ma7 /= 7
                // ma25 /= 25
                // ma99 /= 99
                // let dma7 = req.heigh_candle - ((ma7 - minLowItem.low) * section) + req.paddingTop
                // let dma25 = req.heigh_candle - ((ma25 - minLowItem.low) * section) + req.paddingTop
                // let dma99 = req.heigh_candle - ((ma99 - minLowItem.low) * section) + req.paddingTop

                // if (index === 0) {
                //     dPathMA7 += `M${req.gap_candle * index - req.padding_right_candle} ${dma7}`
                //     dPathMA25 += `M${req.gap_candle * index - req.padding_right_candle} ${dma25}`
                //     dPathMA99 += `M${req.gap_candle * index - req.padding_right_candle} ${dma99}`
                // } else {
                //     dPathMA7 += `L${req.gap_candle * index - req.padding_right_candle} ${dma7}`
                //     dPathMA25 += `L${req.gap_candle * index - req.padding_right_candle} ${dma25}`
                //     dPathMA99 += `L${req.gap_candle * index - req.padding_right_candle} ${dma99}`
                // }

                return (
                    {
                        ...item,
                        highSVG: highSVG,
                        lowSVG: lowSVG,
                        colorChart,
                        closeSVG,
                        openSVG, 
                    }
                )
            })

            console.log('sksj')
            return {
                ...res,
                candles,
                maxHighItem,
                minLowItem,
                heighValueChart,
                // dPathMA: {
                //     ma7: dPathMA7,
                //     ma25: dPathMA25,
                //     ma99: dPathMA99,
                // }
            }
        }
        return res
    })
