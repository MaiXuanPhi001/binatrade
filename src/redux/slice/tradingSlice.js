import { getChartThunk } from "@asyncThunk/tradingAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { colors } from "@theme/colors";

const tradingSlice = createSlice({
    name: 'tradingSlice',
    initialState: {
        candles: [],
        maxHighItem: null,
        minLowItem: null,
        heighValueChart: 0,
        dPathMA: {
            ma5: '',
            ma10: '',
        }
    },
    reducers: {
        setLastChart: (state, { payload }) => {
            if (state.candles.length === 0) return
            if (payload.close > state.maxHighItem.high || payload.close < state.minLowItem.low) {
                const lastChart = state.candles[state.candles.length - 1]
                let candles = []

                if (payload.id != lastChart.id) {
                    candles = state.candles.push(payload)
                } else {
                    candles = state.candles
                    candles[candles.length - 1] = lastChart
                }

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
                const section = payload.HEIGHT_CANLES / heighValueChart

                let [dPathMA5, dPathMA10] = ['', '']

                candles = candles.map((item, index) => {
                    let highSVG = payload.HEIGHT_CANLES - ((item.high - minLowItem.low) * section) + payload.PADDING_TOP
                    let lowSVG = payload.HEIGHT_CANLES - ((item.low - minLowItem.low) * section) + payload.PADDING_TOP
                    let closeSVG = payload.HEIGHT_CANLES - ((item.close - minLowItem.low) * section) + payload.PADDING_TOP
                    let openSVG = payload.HEIGHT_CANLES - ((item.open - minLowItem.low) * section) + payload.PADDING_TOP
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

                    dma5 = payload.HEIGHT_CANLES - ((ma5 - minLowItem.low) * section) + payload.PADDING_TOP
                    dma10 = payload.HEIGHT_CANLES - ((ma10 - minLowItem.low) * section) + payload.PADDING_TOP

                    if (index === 0) {
                        dPathMA5 += `M${payload.GAP_CANDLE * index} ${dma5}`
                        dPathMA10 += `M${payload.GAP_CANDLE * index} ${dma10}`
                    } else {
                        dPathMA5 += `L${payload.GAP_CANDLE * index} ${dma5}`
                        dPathMA10 += `L${payload.GAP_CANDLE * index} ${dma10}`
                    }

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

                let highSVG = payload.HEIGHT_CANLES - ((payload.high - state.minLowItem.low) * section) + payload.PADDING_TOP
                let lowSVG = payload.HEIGHT_CANLES - ((payload.low - state.minLowItem.low) * section) + payload.PADDING_TOP
                let closeSVG = payload.HEIGHT_CANLES - ((payload.close - state.minLowItem.low) * section) + payload.PADDING_TOP
                let openSVG = payload.HEIGHT_CANLES - ((payload.open - state.minLowItem.low) * section) + payload.PADDING_TOP
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
                    ma5,
                    ma10,
                    dma5,
                    dma10,
                }

                const lastChart = state.candles[state.candles.length - 1]

                if (candleItem.id != lastChart.id) {

                    state.candles.push(candleItem)
                    state.candles.shift()

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
                }
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getChartThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.candles = payload.candles
                    state.maxHighItem = payload.maxHighItem
                    state.minLowItem = payload.minLowItem
                    state.heighValueChart = payload.heighValueChart
                    state.dPathMA = payload.dPathMA
                }
            })
    }
})

export default tradingSlice