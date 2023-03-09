import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'
import contants from '@util/contants'
import { chartItemTradeSelector, dataTradeSelector } from '@selector/tradeSelector'
import tradeSlice from '@slice/tradeSlice'
import { getChart } from '@service/chartService'
import { timeHM } from '@method/date'

const Socket = () => {
    const dispatch = useDispatch()
    const socketRef = useRef()
    const chartItem = useSelector(chartItemTradeSelector)
    const dataTrade = useSelector(dataTradeSelector)
    const COIN = 'BTCUSDT'

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
            const data = res.data.slice(180, res.data.length)
            let listTime = []
            let [highChart, lowChart] = [0, 18092002]
            for (let i = 0; i < data.length; i++) {
                highChart < data[i].high && (highChart = data[i].high)
                lowChart > data[i].low && (lowChart = data[i].low)
                listTime.push(timeHM(data[i].timestamp))
            }
            dispatch(tradeSlice.actions.setDataTrade({
                dataTrade: data,
                highChart,
                lowChart,
                listTime: [... new Set(listTime)],
            }))
        } else {
            alert(res.message)
        }
    }

    useMemo(() => {
        if (dataTrade.length > 0 && chartItem?.id) {
            const lastChart = dataTrade[dataTrade.length - 1]

            const data = [...dataTrade, chartItem]
            let listTime = []
            let [highChart, lowChart] = [0, 18092002]
            for (let i = 0; i < data.length; i++) {
                highChart < data[i].high && (highChart = data[i].high)
                lowChart > data[i].low && (lowChart = data[i].low)
                listTime.push(timeHM(data[i].timestamp))
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
                }))
            }
        }
    }, [chartItem])

    return (
        <>
        </>
    )
}

export default Socket