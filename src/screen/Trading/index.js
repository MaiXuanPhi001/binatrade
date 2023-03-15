import { timeHM } from '@method/date'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { screenChooseUserSelector } from '@selector/userSelector'
import { getChart } from '@service/chartService'
import { theme } from '@theme/index'
import contants from '@util/contants'
import routes from '@util/routes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'
import Chart from './Chart'
import PlaceABet from './PlaceABet'
import Statistical from './Statistical'
import Symbol from './Symbol'

const Trading = ({ navigation }) => {
  const screenChoose = useSelector(screenChooseUserSelector)
  const socketRef = useRef()
  const [trades, setTrades] = useState([])
  const [chartItem, setChartItem] = useState({})
  const [lowChart, setLowChart] = useState(18092002)
  const [highChart, setHighChart] = useState(null)
  const [time, setTime] = useState(null)
  const [times, setTimes] = useState([])
  const [dots, setDots] = useState([])
  const LIMIT_DATA = 60
  const COIN = 'BTCUSDT'

  useEffect(() => {
    handleGetChartAPI()

    socketRef.current = socketIOClient.connect(contants.HOSTING)
    socketRef.current.on(COIN, data => {
      if (data) {
        setChartItem(data)
      }
    })

    socketRef.current.on('TIME', timeSocket => {
      setTime(timeSocket)
    })

    return () => socketRef?.current.disconnect()
  }, [])

  useMemo(() => {
    if (trades.length > 0 && chartItem?.id) {
      const lastChart = trades[trades.length - 1]

      const data = [...trades, chartItem]
      let [highChart, lowChart, listTime, dots, i, charts] = [0, 18092002, [], [], 0, []]

      while (i < LIMIT_DATA) {
        if (data[i]) {
          highChart < data[i].high && (highChart = data[i].high)
          lowChart > data[i].low && (lowChart = data[i].low)
          i < data.length - 2 && charts.push(data[i])
          if (i !== data.length - 1) {
            listTime.push(timeHM(data[i].timestamp))
            dots.push(data[i].close > data[i].open ? theme.colors.greenNen : theme.colors.redNen)
          } else {
            dots.push(theme.colors.gray5)
          }
        } else {
          dots.push(theme.colors.gray5)
        }
        i++
      }

      if (lastChart.id === chartItem.id) {
        setLowChart(lowChart)
        setHighChart(highChart)
        setTrades([...charts, chartItem])
      } else {
        setDots(dots)
        setTimes([... new Set(listTime)])
        setLowChart(lowChart)
        setHighChart(highChart)
        setTrades([...trades, chartItem])
        if (trades.length >= LIMIT_DATA) {
          setTimeout(() => {
            setTrades(trades.slice(20, trades.length))
          }, 5000)
        }
      }
    }
  }, [chartItem])

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
      setDots(dots)
      setTimes([... new Set(listTime)])
      setLowChart(lowChart)
      setHighChart(highChart)
      setTrades(data)
    } else {
      alert(res.message)
    }
  }

  return (
    <KeyBoardSafe
      paddingBottom={0}
      bg={theme.colors.drawer}
    >
      <Header navigation={navigation} />
      {screenChoose === routes.TRADE &&
        <View style={{ paddingHorizontal: 5 }}>
          <Symbol />
          <Chart
            trades={trades}
            highChart={highChart}
            lowChart={lowChart}
            times={times}
          />
          <Statistical 
            dots={dots}
          />
          <PlaceABet />
        </View>
      }
    </KeyBoardSafe>
  )
}

export default Trading