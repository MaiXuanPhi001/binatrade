import { timeHM } from '@method/date'
import { chartItemTradeSelector, dataSize40TradeSelector, dataTradeSelector } from '@selector/tradeSelector'
import { getChart } from '@service/chartService'
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
    const dataTrade = useSelector(dataTradeSelector)
    const dataSize40 = useSelector(dataSize40TradeSelector)

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

        return () => socketRef?.current.disconnect()
    }, [])

    useMemo(() => {
        if (dataTrade.length > 0 && chartItem?.id) {
            const lastChart = dataTrade[dataTrade.length - 1]

            const data = [...dataTrade, chartItem]
            let [highChart, lowChart, listTime, dots, i] = [0, 18092002, [], [], 0]
            while (i < LIMIT_DATA) {
                if (data[i]) {
                    highChart < data[i].high && (highChart = data[i].high)
                    lowChart > data[i].low && (lowChart = data[i].low)
                    listTime.push(timeHM(data[i].timestamp))
                }
                if (dataSize40[i]) {
                    dots.push(dataSize40[i].close > dataSize40[i].open ? theme.colors.greenNen : theme.colors.redNen)
                } else {
                    dots.push(theme.colors.gray5)
                }
                i++
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

                if (dataSize40.length >= LIMIT_DATA) {
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
            const data = res.data.slice(160, res.data.length)
            const candlestick = res.data.slice(180, res.data.length)
            let [listTime, highChart, lowChart, dots, buyer, seller, i] = [[], 0, 18092002, [], 0, 0, 0]
            while (i < LIMIT_DATA) {
                if (candlestick[i]) {
                    highChart < candlestick[i].high && (highChart = candlestick[i].high)
                    lowChart > candlestick[i].low && (lowChart = candlestick[i].low)
                    listTime.push(timeHM(candlestick[i].timestamp))
                }
                if (data[i]) {
                    dots.push(data[i].close > data[i].open ? theme.colors.greenNen : theme.colors.redNen)
                } else {
                    dots.push(theme.colors.gray5)
                }
                i++
            }

            for (let i = candlestick.length - 1; i >= 0; i--) {
                if (candlestick[i].order === 1) {
                    [buyer, seller] = [candlestick[i].buyer, candlestick[i].seller]
                    break
                }
            }

            dispatch(tradeSlice.actions.setDataTrade({
                dataTrade: candlestick,
                highChart,
                lowChart,
                listTime: [... new Set(listTime)],
                buyer,
                seller,
                dots,
                dataSize40: data
            }))
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