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

    return () => socketRef?.current.disconnect()
  }, [])

  useMemo(() => {
    if (trades.length > 0 && chartItem?.id) {
      const lastChart = trades[trades.length - 1]

      const data = [...trades, chartItem]
      let [highChart, lowChart, listTime, dots] = [0, 18092002, [], []]
      for (let i = 0; i < LIMIT_DATA; i++) {
        if (data[i]) {
          highChart < data[i].high && (highChart = data[i].high)
          lowChart > data[i].low && (lowChart = data[i].low)
          if (i !== data.length - 1) {
            // listTime.push(timeHM(data[i].timestamp))
            // dots.push(data[i].close > data[i].open ? theme.colors.greenNen : theme.colors.redNen)
          } else {
            // dots.push(theme.colors.gray5)
          }
        } else {
          // dots.push(theme.colors.gray5)
        }
      }

      if (lastChart.id === chartItem.id) {
        let tradesCopy = trades
        tradesCopy[tradesCopy.length - 1] = chartItem
        setLowChart(lowChart)
        setHighChart(highChart)
        setTrades(tradesCopy)
      } else {
        setLowChart(lowChart)
        setHighChart(highChart)
        setTrades([...trades, chartItem])
        if (trades.length >= 60) {
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
          // listTime.push(timeHM(data[i].timestamp))
          // dots.push(data[i].close > data[i].open ? theme.colors.greenNen : theme.colors.redNen)
        } else {
          // dots.push(theme.colors.gray5)
        }
      }
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
          />
          <Statistical />
          <PlaceABet />
        </View>
      }
    </KeyBoardSafe>
  )
}

export default Trading