import { timeHM } from '@method/date'
import { chartItemTradeSelector, dataTradeSelector } from '@selector/tradeSelector'
import { getChart } from '@service/chartService'
import tradeSlice from '@slice/tradeSlice'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'

const Socket = () => {
    const dispatch = useDispatch()
    const socketRef = useRef()
    const chartItem = useSelector(chartItemTradeSelector)
    const dataTrade = useSelector(dataTradeSelector)
    const COIN = 'BTCUSDT'
    const LIMIT_DATA = 60

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

    const handleGetChartAPI = async () => {
        const res = await getChart(COIN)
        if (res.status) {
            const data = res.data.slice(160, res.data.length)
            let [listTime, highChart, lowChart, dots, buyer, seller] = [[], 0, 18092002, [], 0, 0]
            for (let i = 0; i < LIMIT_DATA; i++) {
                if (data[i]) {
                    highChart < data[i].high && (highChart = data[i].high)
                    lowChart > data[i].low && (lowChart = data[i].low)
                    listTime.push(timeHM(data[i].timestamp))
                    dots.push(data[i].close > data[i].open ? theme.colors.greenNen : theme.colors.redNen)
                } else {
                    dots.push(theme.colors.gray5)
                }
            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].order === 1) {
                    [buyer, seller] = [data[i].buyer, data[i].seller]
                    break
                }
            }

            dispatch(tradeSlice.actions.setDataTrade({
                dataTrade: data,
                highChart,
                lowChart,
                listTime: [... new Set(listTime)],
                buyer,
                seller,
                dots,
            }))
        } else {
            alert(res.message)
        }
    }

    useMemo(() => {
        if (dataTrade.length > 0 && chartItem?.id) {
            const lastChart = dataTrade[dataTrade.length - 1]

            const data = [...dataTrade, chartItem]
            let [highChart, lowChart, listTime, dots] = [0, 18092002, [], []]
            for (let i = 0; i < LIMIT_DATA; i++) {
                if (data[i]) {
                    highChart < data[i].high && (highChart = data[i].high)
                    lowChart > data[i].low && (lowChart = data[i].low)
                    if (i !== data.length - 1) {
                        listTime.push(timeHM(data[i].timestamp))
                        dots.push(data[i].close > data[i].open ? theme.colors.greenNen : theme.colors.redNen)
                    } else {
                        dots.push(theme.colors.gray5)
                    }
                } else {
                    dots.push(theme.colors.gray5)
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

                if (dataTrade.length >= 60) {
                    setTimeout(() => {
                        dispatch(tradeSlice.actions.resetTrade())
                    }, 5000)
                }
            }
        }
    }, [chartItem])

    return (
        <>
        </>
    )
}

export default Socket