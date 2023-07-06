import { getAllOrderPendingUserThunk } from '@asyncThunk/tradingAsyncThunk'
import Box from '@commom/Box'
import { useNavigation } from '@react-navigation/native'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { orderPendingTradingSelector } from '@selector/tradingSelector'
import { themeUserSelector, typeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import contants from '@util/contants'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketIOClient from 'socket.io-client'
import CloseOrders from './CloseOrders'
import OpenOrders from './OpenOrders'
import Tab from './Tab'
import { dayWeekHistoryOrderTradingSelector } from '@selector/fundingSelector'
import { dayHistoryOrderThunk } from '@asyncThunk/fundingAsyncThunk'

const Orders = () => {
  const dispatch = useDispatch()
  const COLOR = colors[useSelector(themeUserSelector)]
  const type = useSelector(typeUserSelector)
  const allPendingUser = useSelector(orderPendingTradingSelector)
  const dayHistoryOrder = useSelector(dayWeekHistoryOrderTradingSelector)
  const [tab, setTab] = useState('open')
  const socketRef = useRef()
  const navigation = useNavigation()

  useEffect(() => {
    socketRef.current = socketIOClient.connect(contants.HOSTING)
    socketRef.current.on('TIME', time => {
      if (time === 1) {
        handleGetAllOrderPending()
      }
    })

    const blur = navigation.addListener('blur', () => {
      socketRef.current.disconnect()
    })

    const focus = navigation.addListener('focus', () => {
      handleGetAllOrderPending()
      socketRef.current.connect()
    })

    return () => {
      blur
      focus
    }

  }, [])

  const handleGetAllOrderPending = async () => {
    await dispatch(getAllOrderPendingUserThunk(type))
    await dispatch(dayHistoryOrderThunk({
      limit: 10,
      page: dayHistoryOrder.page,
      type: type,
    }))
  }

  return (
    <KeyBoardSafe paddingBottom={0} bg={COLOR.backgroundProfile}>
      <Header navigation={navigation} />
      <Box paddingHorizontal={10}>
        <Tab {...{ tab, setTab, COLOR }} />
        {tab === 'open' ? <OpenOrders {...{ allPendingUser, COLOR }} /> :
          <CloseOrders {...{ dayHistoryOrder, COLOR }} />}
      </Box>
    </KeyBoardSafe>
  )
}

export default Orders