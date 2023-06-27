import { getChartThunk } from "@asyncThunk/tradingAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { colors } from "@theme/colors";

const tradingSlice = createSlice({
    name: 'tradingSlice',
    initialState: {
        trade: [],
        candles: [],
        maxHighItem: null,
        minLowItem: null,
        heighValueChart: 0,
        time: 0,
        volumeCandles: {
            max: Number.MIN_SAFE_INTEGER,
            min: Number.MAX_SAFE_INTEGER,
            height: 0,
        },
        dPathMA: {
            ma5: '',
            ma10: '',
        },
    },
    reducers: {
        setLastChart: (state, { payload }) => {
            state.time = payload.timeSocket
            if (state.candles.length === 0) return
            if (payload.close > state.maxHighItem.high || payload.close < state.minLowItem.low ||
                payload.volume > state.volumeCandles.max || payload.volume < state.volumeCandles.min) {
                const lastChart = state.candles[state.candles.length - 1]
                let candles = []

                if (payload.id != lastChart.id) {
                    state.candles.push(payload)
                    state.trade.push(payload)
                    state.trade.shift()
                    candles = state.candles
                    candles.shift()
                } else {
                    candles = state.candles
                    candles[candles.length - 1] = lastChart
                    state.trade[state.trade.length - 1] = lastChart
                }

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
                maxHighItem.high = maxHighItem.high + (heighChart / 4)
                minLowItem.low = minLowItem.low - (heighChart / 4)
                const heighValueChart = maxHighItem.high - minLowItem.low
                const section = payload.HEIGHT_CANLES / heighValueChart
                const sectionVolume = (payload.HEIGHT_SVG - payload.HEIGHT_VOLUME) / volumeCandles.height

                let [dPathMA5, dPathMA10] = ['', '']
                const max_size = state.trade.length - payload.SIZE_CHART - 1

                candles = candles.map((item, index) => {
                    let highSVG = payload.HEIGHT_CANLES - ((item.high - minLowItem.low) * section) + payload.PADDING_TOP
                    let lowSVG = payload.HEIGHT_CANLES - ((item.low - minLowItem.low) * section) + payload.PADDING_TOP
                    let closeSVG = payload.HEIGHT_CANLES - ((item.close - minLowItem.low) * section) + payload.PADDING_TOP
                    let openSVG = payload.HEIGHT_CANLES - ((item.open - minLowItem.low) * section) + payload.PADDING_TOP
                    let volumeSVG = payload.HEIGHT_SVG - (item.volume - volumeCandles.min) * sectionVolume - 3
                    let colorChart =
                        item.close >= item.open ? colors.greenCan : colors.red3

                    let [ma5, ma10, dma5, dma10] = [0, 0, 0, 0]
                    for (let i = (index + max_size); i > (index + max_size - 10); i--) {
                        const close = state.trade[i].close
                        if ((index + max_size - i) < 5) ma5 += close
                        ma10 += close
                    }
                    ma5 /= 5
                    ma10 /= 10

                    dma5 = payload.HEIGHT_CANLES - ((ma5 - minLowItem.low) * section) + payload.PADDING_TOP
                    dma10 = payload.HEIGHT_CANLES - ((ma10 - minLowItem.low) * section) + payload.PADDING_TOP

                    if (index === 0) {
                        dPathMA5 += `M${payload.GAP_CANDLE * index} ${dma5}`
                        dPathMA10 += `M${payload.GAP_CANDLE * index} ${dma10}`
                    } else {
                        dPathMA5 += `L${payload.GAP_CANDLE * index} ${dma5}`
                        dPathMA10 += `L${payload.GAP_CANDLE * index} ${dma10}`
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

                state.candles = candles
                state.maxHighItem = maxHighItem
                state.minLowItem = minLowItem
                state.heighValueChart = heighValueChart
                state.dPathMA = {
                    ma5: dPathMA5,
                    ma10: dPathMA10,
                }
            } else {
                const section = payload.HEIGHT_CANLES / state.heighValueChart
                const sectionVolume = (payload.HEIGHT_SVG - payload.HEIGHT_VOLUME) / state.volumeCandles.height

                let highSVG = payload.HEIGHT_CANLES - ((payload.high - state.minLowItem.low) * section) + payload.PADDING_TOP
                let lowSVG = payload.HEIGHT_CANLES - ((payload.low - state.minLowItem.low) * section) + payload.PADDING_TOP
                let closeSVG = payload.HEIGHT_CANLES - ((payload.close - state.minLowItem.low) * section) + payload.PADDING_TOP
                let openSVG = payload.HEIGHT_CANLES - ((payload.open - state.minLowItem.low) * section) + payload.PADDING_TOP
                let volumeSVG = payload.HEIGHT_SVG - (payload.volume - state.volumeCandles.min) * sectionVolume - 3
                let colorChart =
                    Number(payload.close) >= Number(payload.open) ? colors.greenCan : colors.red3

                let [ma5, ma10] = [0, 0]
                for (let i = (state.candles.length - 1); i >= (state.candles.length - 10); i--) {
                    const close = state.candles[i].close
                    if (i >= (state.candles.length - 5)) ma5 += close
                    ma10 += close
                }
                ma5 /= 5
                ma10 /= 10

                let dma5 = payload.HEIGHT_CANLES - ((ma5 - state.minLowItem.low) * section) + payload.PADDING_TOP
                let dma10 = payload.HEIGHT_CANLES - ((ma10 - state.minLowItem.low) * section) + payload.PADDING_TOP

                let candleItem = {
                    ...payload,
                    highSVG,
                    lowSVG,
                    colorChart,
                    closeSVG,
                    openSVG,
                    volumeSVG,
                    ma5,
                    ma10,
                    dma5,
                    dma10,
                }

                const lastChart = state.candles[state.candles.length - 1]

                if (candleItem.id != lastChart.id) {
                    state.candles.push(candleItem)
                    state.trade.push(candleItem)
                    state.candles.shift()
                    state.trade.shift()

                    state.dPathMA.ma5 = ''
                    state.dPathMA.ma10 = ''
                    for (let index = 0; index < state.candles.length; index++) {
                        const cande = state.candles[index]

                        if (index === 0) {
                            state.dPathMA.ma5 += `M${payload.GAP_CANDLE * index} ${cande.dma5}`
                            state.dPathMA.ma10 += `M${payload.GAP_CANDLE * index} ${cande.dma10}`
                        } else {
                            state.dPathMA.ma5 += `L${payload.GAP_CANDLE * index} ${cande.dma5}`
                            state.dPathMA.ma10 += `L${payload.GAP_CANDLE * index} ${cande.dma10}`
                        }
                    }
                } else {
                    state.candles[state.candles.length - 1] = candleItem
                    state.trade[state.trade.length - 1] = candleItem
                }
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getChartThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.trade = payload.array
                    state.candles = payload.candles
                    state.maxHighItem = payload.maxHighItem
                    state.minLowItem = payload.minLowItem
                    state.heighValueChart = payload.heighValueChart
                    state.volumeCandles = payload.volumeCandles
                    state.dPathMA = payload.dPathMA
                }
            })
    }
})

export default tradingSlice