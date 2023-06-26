import { createAsyncThunk } from "@reduxjs/toolkit"
import { getChart } from "@service/tradeService"
import { colors } from "@theme/colors"

export const getChartThunk =
    createAsyncThunk('trading/getChartThunk', async (data) => {
        const res = await getChart(data.symbol)
        if (res.status) {
            let array = res.data
            // let candles = array.slice(array.length - data.size_chart, array.length)

            let candles = [
                {
                    "buy": 0,
                    "buyer": 39267,
                    "close": 93,
                    "high": 125,
                    "closeBuy": 0,
                    "low": 50,
                    "open": 75,
                    "closeCandlestick": 0,
                    "closeSell": 0,
                    "id": 1,
                    "idChart": 0,
                    "order": 1,
                    "orderAuto": 1,
                    "orderBuy": 0,
                    "orderSell": 0,
                    "ramdomNumberVol": 9,
                    "sell": 0,
                    "seller": 40606,
                    "symbol": "BTCUSDT",
                    "timestamp": 1687744560,
                    "volume": 100
                },
                {
                    "buy": 0,
                    "buyer": 39267,
                    "close": 100,
                    "high": 118,
                    "closeBuy": 0,
                    "low": 50,
                    "open": 75,
                    "closeCandlestick": 0,
                    "closeSell": 0,
                    "id": 2,
                    "idChart": 0,
                    "order": 1,
                    "orderAuto": 1,
                    "orderBuy": 0,
                    "orderSell": 0,
                    "ramdomNumberVol": 9,
                    "sell": 0,
                    "seller": 40606,
                    "symbol": "BTCUSDT",
                    "timestamp": 1687744560,
                    "volume": 50
                },
                {
                    "buy": 0,
                    "buyer": 39267,
                    "close": 100,
                    "high": 118,
                    "closeBuy": 0,
                    "low": 50,
                    "open": 75,
                    "closeCandlestick": 0,
                    "closeSell": 0,
                    "id": 3,
                    "idChart": 0,
                    "order": 1,
                    "orderAuto": 1,
                    "orderBuy": 0,
                    "orderSell": 0,
                    "ramdomNumberVol": 9,
                    "sell": 0,
                    "seller": 40606,
                    "symbol": "BTCUSDT",
                    "timestamp": 1687744560,
                    "volume": 75
                },
            ]

            let [maxHighItem, minLowItem, volumeCandles] = [
                { high: Number.MIN_SAFE_INTEGER },
                { low: Number.MAX_SAFE_INTEGER },
                { max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER, height: 0 },
            ]

            for (let i = 0; i < candles.length; i++) {
                // Tìm high cao nhất trong data
                maxHighItem = candles[i].high >= maxHighItem.high ?
                    { ...candles[i], position: i } : maxHighItem
                // Tìm low thấp nhất trong data
                minLowItem = candles[i].low <= minLowItem.low ?
                    { ...candles[i], position: i } : minLowItem

                // Tìm volume cao nhất trong data
                volumeCandles.max = candles[i].volume >= volumeCandles.max ?
                    candles[i].volume : volumeCandles.max

                // Timf volume thấp nhất trong data
                volumeCandles.min = candles[i].volume <= volumeCandles.min ?
                    candles[i].volume : volumeCandles.min
            }

            // Tính filed height trong volumeCandles
            volumeCandles = { ...volumeCandles, height: volumeCandles.max - volumeCandles.min }

            const heighChart = maxHighItem.high - minLowItem.low
            maxHighItem.high = Number(maxHighItem.high) + (heighChart / 4)
            minLowItem.low = minLowItem.low - (heighChart / 4)
            const heighValueChart = maxHighItem.high - minLowItem.low
            const section = data.heigh_candle / heighValueChart
            const sectionVolume = (data.height_svg - data.height_volume) / volumeCandles.height

            let [dPathMA5, dPathMA10] = ['', '']

            candles = candles.map((item, index) => {
                let highSVG = data.heigh_candle - ((item.high - minLowItem.low) * section) + data.paddingTop
                let lowSVG = data.heigh_candle - ((item.low - minLowItem.low) * section) + data.paddingTop
                let closeSVG = data.heigh_candle - ((item.close - minLowItem.low) * section) + data.paddingTop
                let openSVG = data.heigh_candle - ((item.open - minLowItem.low) * section) + data.paddingTop
                let volumeSVG = data.height_svg - (item.volume - volumeCandles.min) * sectionVolume

                let colorChart =
                    Number(item.close) >= Number(item.open) ? colors.greenCan : colors.red3

                let [ma5, ma10, dma5, dma10] = [item.close, item.close, 0, 0]
                if (index >= 10) {
                    [ma5, ma10] = [0, 0]
                    for (let i = index - 1; i >= (index - 10); i--) {
                        const close = candles[i].close
                        ma10 += close
                        if (i >= (index - 5)) ma5 += close
                    }
                    ma5 /= 5
                    ma10 /= 10
                }

                dma5 = data.heigh_candle - ((ma5 - minLowItem.low) * section) + data.paddingTop
                dma10 = data.heigh_candle - ((ma10 - minLowItem.low) * section) + data.paddingTop

                if (index === 0) {
                    dPathMA5 += `M${data.gap_candle * index} ${dma5}`
                    dPathMA10 += `M${data.gap_candle * index} ${dma10}`
                } else {
                    dPathMA5 += `L${data.gap_candle * index} ${dma5}`
                    dPathMA10 += `L${data.gap_candle * index} ${dma10}`
                }

                return (
                    {
                        ...item,
                        highSVG: highSVG,
                        lowSVG: lowSVG,
                        colorChart,
                        closeSVG,
                        openSVG,
                        volumeSVG,
                        ma5,
                        ma10,
                        dma5,
                        dma10,
                    }
                )
            })

            return {
                ...res,
                candles,
                maxHighItem,
                minLowItem,
                heighValueChart,
                dPathMA: {
                    ma5: dPathMA5,
                    ma10: dPathMA10,
                }
            }
        }
        return res
    })


            // let candles = [
            //     {
            //         "buy": 0,
            //         "buyer": 39267,
            //         "close": 93,
            //         "high": 125,
            //         "closeBuy": 0,
            //         "low": 50,
            //         "open": 75,
            //         "closeCandlestick": 0,
            //         "closeSell": 0,
            //         "id": 1,
            //         "idChart": 0,
            //         "order": 1,
            //         "orderAuto": 1,
            //         "orderBuy": 0,
            //         "orderSell": 0,
            //         "ramdomNumberVol": 9,
            //         "sell": 0,
            //         "seller": 40606,
            //         "symbol": "BTCUSDT",
            //         "timestamp": 1687744560,
            //         "volume": 61.217
            //     },
            //     {
            //         "buy": 0,
            //         "buyer": 39267,
            //         "close": 100,
            //         "high": 118,
            //         "closeBuy": 0,
            //         "low": 50,
            //         "open": 75,
            //         "closeCandlestick": 0,
            //         "closeSell": 0,
            //         "id": 2,
            //         "idChart": 0,
            //         "order": 1,
            //         "orderAuto": 1,
            //         "orderBuy": 0,
            //         "orderSell": 0,
            //         "ramdomNumberVol": 9,
            //         "sell": 0,
            //         "seller": 40606,
            //         "symbol": "BTCUSDT",
            //         "timestamp": 1687744560,
            //         "volume": 61.217
            //     },
            // ]