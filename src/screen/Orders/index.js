import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Tab from './Tab'
import OpenOrders from './OpenOrders'
import Box from '@commom/Box'
import Header from '@reuse/Header'

const data = [
  {
    "id": 97928,
    "username": "test",
    "email": "test@gmail.com",
    "side": "sell",
    "amount": 10,
    "configProfit": 0.95,
    "userid": 3,
    "created_at": "2023-07-03T08:37:58.000Z",
    "symbol": "BTCUSDT",
    "status": "PENDING",
    "type": "live",
    "resultProfit": 0,
    "idChart": 2517444,
    "draw": 0,
    "streak": 0,
    "streakStr": null
  },
  {
    "id": 97929,
    "username": "test",
    "email": "test@gmail.com",
    "side": "buy",
    "amount": 20,
    "configProfit": 0.95,
    "userid": 3,
    "created_at": "2023-07-03T08:38:01.000Z",
    "symbol": "BTCUSDT",
    "status": "PENDING",
    "type": "live",
    "resultProfit": 0,
    "idChart": 2517444,
    "draw": 0,
    "streak": 0,
    "streakStr": null
  }
]

const Orders = ({ navigation }) => {
  const COLOR = colors[useSelector(themeUserSelector)]
  const [tab, setTab] = useState('open')

  return (
    <KeyBoardSafe paddingBottom={0} bg={COLOR.backgroundProfile}>
      <Header navigation={navigation} />
      <Box paddingHorizontal={10}>
        <Tab {...{ tab, setTab, COLOR }} />
        <OpenOrders {...{ data, COLOR }} />
      </Box>
    </KeyBoardSafe>
  )
}

export default Orders