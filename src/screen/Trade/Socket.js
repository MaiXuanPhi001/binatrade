import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'
import contants from '@util/contants'
import { dataTradeSelector } from '@selector/tradeSelector'
import tradeSlice from '@slice/tradeSlice'
import { getChart } from '@service/chartService'

const Socket = () => {
    const dispatch = useDispatch()
    const socketRef = useRef()
    const [chartItem, setChartItem] = useState({})
    const dataTrade = useSelector(dataTradeSelector)
    const COIN = 'BTCUSDT'

    useEffect(() => {
        handleGetChartAPI()

        socketRef.current = socketIOClient.connect(contants.HOSTING)
        socketRef.current.on(COIN, data => {
            if (data) {
                setChartItem(data)
            }
        })
    }, [])

    const handleGetChartAPI = async () => {
        const res = await getChart(COIN)
        if (res.status) {
            dispatch(tradeSlice.actions.setDataTrade(
                res.data.slice(180, res.data.length)
            ))
        } else {
            alert(res.message)
        }
    }

    useMemo(() => {
        if (dataTrade.length > 0 && chartItem?.id) {
            const lastChart = dataTrade[dataTrade.length - 1]
            if (lastChart.id === chartItem.id) {
                dispatch(tradeSlice.actions.changeDataTrade(chartItem))
            } else {
                dispatch(tradeSlice.actions.addDataTrade(chartItem))
            }
        }
    }, [chartItem])

    return (
        <>
        </>
    )
}

export default Socket