import { getAllOrderPendingUserThunk, getChartThunk, orderThunk } from "@asyncThunk/tradingAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";
import { colors } from "@theme/colors";

const tradingSlice = createSlice({
    name: 'tradingSlice',
    initialState: {
        trade: [],
        candles: [],
        dots: [],
        order: {
            loading: false,
            amount: 10,
            profit: 19.5,
        },
        orderPending: [],
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
        setOrder: (state, { payload }) => {
            state.order.amount = payload.amount
            state.order.profit = (state.order.amount * 0.95) + state.order.amount
        },
        setLastChart: (state, { payload }) => {
            state.time = payload.timeSocket
            if (state.candles.length <= 0) return
            const lastChart = state.candles[state.candles.length - 1]
            if (payload.data.id !== lastChart.id) {
                state.trade.push(payload.data)
                state.trade.shift()
                state.candles.push(payload.data)
                state.candles.shift()
                state.dots.push(lastChart)
                if (state.dots.length >= 61) {
                    state.dots = state.trade.slice(state.trade.length - 40, state.trade.length - 1)
                }
            } else {
                state.trade[state.trade.length - 1] = payload.data
                state.candles[state.candles.length - 1] = payload.data
            }
            handleSetChart(state, payload)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getChartThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.trade = payload.data
                    state.candles = payload.data.slice(payload.data.length - payload.size_chart, payload.data.length)
                    state.dots = payload.data.slice(payload.data.length - 40, payload.data.length - 1)
                    handleSetChart(state, payload)
                }
            })
            .addCase(orderThunk.pending, (state) => {
                state.order.loading = true
            })
            .addCase(orderThunk.fulfilled, (state) => {
                state.order.loading = false
            })
            .addCase(getAllOrderPendingUserThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.orderPending = payload.data
                }
            })
    }
})

const handleSetChart = (state, payload) => {
    let [maxHighItem, minLowItem, volumeCandles, candles] = [
        { high: Number.MIN_SAFE_INTEGER },
        { low: Number.MAX_SAFE_INTEGER },
        { max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER, height: 0 },
        state.candles,
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

        // Tim volume thấp nhất trong data
        volumeCandles.min = candles[i].volume <= volumeCandles.min ?
            candles[i].volume : volumeCandles.min
    }

    // Tính filed height trong volumeCandles
    volumeCandles.height = volumeCandles.max - volumeCandles.min
    const heighChart = maxHighItem.high - minLowItem.low
    maxHighItem.high = maxHighItem.high + (heighChart / 2)
    minLowItem.low = minLowItem.low - (heighChart / 5)
    const heighValueChart = maxHighItem.high - minLowItem.low
    const section = payload.heigh_candle / heighValueChart
    const sectionVolume = (payload.height_svg - payload.height_volume) / volumeCandles.height

    let [dPathMA5, dPathMA10, sumMA5, sumMA10] = ['', '', 0, 0]
    const max_size = state.trade.length - payload.size_chart

    candles = candles.map((item, index) => {
        let highSVG = payload.heigh_candle - ((item.high - minLowItem.low) * section) + payload.paddingTop
        let lowSVG = payload.heigh_candle - ((item.low - minLowItem.low) * section) + payload.paddingTop
        let closeSVG = payload.heigh_candle - ((item.close - minLowItem.low) * section) + payload.paddingTop
        let openSVG = payload.heigh_candle - ((item.open - minLowItem.low) * section) + payload.paddingTop
        let volumeSVG = payload.height_svg - (item.volume - volumeCandles.min) * sectionVolume - 3
        let colorChart = item.close > item.open ? colors.greenCan :
            item.close < item.open ? colors.red3 : colors.white

        if (index === 0) {
            for (let i = max_size; i > (max_size - 10); i--) {
                const close = state.trade[i].close
                sumMA10 += close
                if ((max_size - i) < 5) sumMA5 += close
            }
        } else {
            const firstValueSumMA5 = state.trade[max_size + index - 5].close
            const firstValueSumMA10 = state.trade[max_size + index - 10].close
            const current = item.close
            sumMA5 = sumMA5 - firstValueSumMA5 + current
            sumMA10 = sumMA10 - firstValueSumMA10 + current
        }

        let dma5 = payload.heigh_candle - ((sumMA5 / 5 - minLowItem.low) * section) + payload.paddingTop
        let dma10 = payload.heigh_candle - ((sumMA10 / 10 - minLowItem.low) * section) + payload.paddingTop

        const char = index === 0 ? 'M' : 'L'
        dPathMA5 += `${char}${payload.gap_candle * index} ${dma5}`
        dPathMA10 += `${char}${payload.gap_candle * index} ${dma10}`

        return {
            ...item,
            highSVG: highSVG,
            lowSVG: lowSVG,
            colorChart,
            closeSVG,
            openSVG,
            volumeSVG,
            ma5: sumMA5 / 5,
            ma10: sumMA10 / 10,
            dma5,
            dma10,
        }
    })

    state.candles = candles
    state.maxHighItem = maxHighItem
    state.minLowItem = minLowItem
    state.heighValueChart = heighValueChart
    state.volumeCandles = volumeCandles
    state.dPathMA = {
        ma5: dPathMA5,
        ma10: dPathMA10,
    }
}

export default tradingSlice