import { getAllOrderPendingUserThunk } from '@asyncThunk/tradeAsyncThunk'
import { timeHM } from '@method/date'
import { candlesTradeSelector, chartItemTradeSelector, dataTradeSelector, highChartTradeSelector, lowChartTradeSelector } from '@selector/tradeSelector'
import { typeUserSelector } from '@selector/userSelector'
import { getChart } from '@service/tradeService'
import tradeSlice from '@slice/tradeSlice'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'

const COIN = 'BTCUSDT'
const LIMIT_DATA = 60

const Socket = () => {
    const dispatch = useDispatch()
    const socketRef = useRef()
    const chartItem = useSelector(chartItemTradeSelector)
    const candles = useSelector(candlesTradeSelector)
    const dataTrade = useSelector(dataTradeSelector)
    const highTrade = useSelector(highChartTradeSelector)
    const lowTrade = useSelector(lowChartTradeSelector)
    const typeAccount = useSelector(typeUserSelector)

    useEffect(() => {
        handleGetChartAPI()

        socketRef.current = socketIOClient.connect(contants.HOSTING)
        socketRef.current.on(COIN, data => {
            if (data) {
                dispatch(tradeSlice.actions.setChartItem(data))
            }
        })

        socketRef.current.on('TIME', timeSocket => {
            dispatch(tradeSlice.actions.setTime(timeSocket))
        })

        return () => socketRef?.current?.disconnect()
    }, [])

    useMemo(() => {
        if (candles.length > 0 && chartItem?.id) {
            const lastChart = candles[candles.length - 1]

            const data = [...candles, chartItem]
            let [highChart, lowChart, listTime, dots, i] = [highTrade, lowTrade, [], [], 0]
            if (chartItem.high > highChart || chartItem.low < lowChart || lastChart.id !== chartItem.id) {
                while (i < LIMIT_DATA) {
                    if (data[i]) {
                        highChart < data[i].high && (highChart = data[i].high)
                        lowChart > data[i].low && (lowChart = data[i].low)
                        listTime.push(timeHM(data[i].timestamp))
                    }

                    if (dataTrade[i]) {
                        if (dataTrade[i].close === dataTrade[i].open) {
                            dots.push('white')
                        } else if (dataTrade[i].close > dataTrade[i].open) {
                            dots.push(theme.colors.greenNen)
                        } else {
                            dots.push(theme.colors.redNen)
                        }
                    } else {
                        dots.push(theme.colors.gray5)
                    }

                    i++
                }
            }

            if (lastChart.id === chartItem.id) {
                dispatch(tradeSlice.actions.changeDataTrade({
                    chartItem,
                    lowChart,
                    highChart,
                }))
            } else {
                dispatch(tradeSlice.actions.addDataTrade({
                    chartItem,
                    lowChart,
                    highChart,
                    listTime: [... new Set(listTime)],
                    dots,
                }))

                if (dataTrade.length >= LIMIT_DATA) {
                    setTimeout(() => {
                        dispatch(tradeSlice.actions.resetTrade())
                    }, 5000)
                }
            }
        }
    }, [chartItem])

    const handleGetChartAPI = async () => {
        const res = await getChart(COIN)
        if (res.status) {
            const dataAPI = res.data.slice(160, res.data.length)
            const candles = res.data.slice(170, res.data.length)
            let [listTime, highChart, lowChart, dots, buyer, seller, i] = [[], 0, 18092002, [], 0, 0, 0]
            while (i < LIMIT_DATA) {
                if (candles[i]) {
                    highChart < candles[i].high && (highChart = candles[i].high)
                    lowChart > candles[i].low && (lowChart = candles[i].low)
                    listTime.push(timeHM(candles[i].timestamp))
                }

                if (dataAPI[i]) {
                    if (dataAPI[i].close === dataAPI[i].open) {
                        dots.push('white')
                    } else if (dataAPI[i].close > dataAPI[i].open) {
                        dots.push(theme.colors.greenNen)
                    } else {
                        dots.push(theme.colors.redNen)
                    }
                } else {
                    dots.push(theme.colors.gray5)
                }
                
                i++
            }

            candles[0] = {
                ...candles[0], 
                high: highChart,
                low: lowChart,
                close: highChart,
                open: lowChart
            }

            for (let i = candles.length - 1; i >= 0; i--) {
                if (candles[i].order === 1) {
                    [buyer, seller] = [candles[i].buyer, candles[i].seller]
                    break
                }
            }

            dispatch(tradeSlice.actions.setDataTrade({
                candles,
                highChart,
                lowChart,
                listTime: [... new Set(listTime)],
                buyer,
                seller,
                dots,
                dataAPI,
            }))

            dispatch(getAllOrderPendingUserThunk(typeAccount))
        } else {
            alert(res.message)
        }
    }

    return (
        <>
        </>
    )
}

export default Socket