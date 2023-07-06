import { getAllOrderPendingUserThunk, orderThunk } from '@asyncThunk/tradingAsyncThunk'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import LoadingWhite from '@reuse/LoadingWhite'
import { candlesTradingSelector, orderPendingTradingSelector, orderTradingSelector, timeTradingSelector } from '@selector/tradingSelector'
import { themeUserSelector, typeUserSelector } from '@selector/userSelector'
import { theme } from '@theme/index'
import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ModalWin from './ModalWin'
import ToastOrder from './ToastOrder'
import { colors } from '@theme/colors'

const BuyOrSell = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const candles = useSelector(candlesTradingSelector)
  const order = useSelector(orderTradingSelector)
  const orderPending = useSelector(orderPendingTradingSelector)
  const timeServer = useSelector(timeTradingSelector)
  const type = useSelector(typeUserSelector)
  const toastRef = useRef(null)
  const COLOR = colors[useSelector(themeUserSelector)]

  const [isShowModalWin, setShowModalWin] = useState(false)
  const [profit, setProfit] = useState(0)

  const time = timeServer > 30 ? 61 - timeServer : 31 - timeServer
  const color = !(timeServer >= 31 && timeServer <= 60) ? theme.colors.greenNen : theme.colors.redNen
  const disable = color === theme.colors.greenNen ? false : true

  useMemo(() => {
    if (timeServer === 1 && orderPending.length > 0 && candles.length > 0) {
      const penultimate = candles[candles.length - 2]
      const side = penultimate.close > penultimate.open ? 'buy' : 'sell'
      let profit = 0

      orderPending.forEach(element => {
        if (element.side === side) {
          profit = (element.amount * 0.95) + element.amount
        }
      })
      if (profit > 0) {
        setShowModalWin(true)
        setProfit(profit)
        setTimeout(() => {
          setShowModalWin(false)
          setProfit(0)
        }, 3500)
      }
      dispatch(getProfileThunk())
      dispatch(getAllOrderPendingUserThunk(type))
    }
  }, [time])

  const handleOrder = async (side) => {
    const { payload } = await dispatch(
      orderThunk({
        symbol: 'BTCUSDT',
        type,
        side,
        amount: order.amount,
        api: 'order',
      })
    )
    toastRef.current?.slide(payload)
    if (payload.status) {
      dispatch(getProfileThunk())
      dispatch(getAllOrderPendingUserThunk(type))
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleOrder('sell')}
        disabled={disable || order.loading}
        style={[
          styles.button,
          { backgroundColor: disable ? COLOR.gray4 : theme.colors.redNen }
        ]}
      >
        {order.loading ? <LoadingWhite /> :
          <>
            <Text style={[styles.textButton, { color: disable ? COLOR.white : colors.white }]}>
              {t('SELL')}
            </Text>
            <Image
              source={require('@images/trade/rise_down.png')}
              style={[styles.imageButton, { tintColor: disable ? COLOR.white : colors.white }]}
            />
          </>
        }
      </TouchableOpacity>

      <View style={[styles.timeContainer]}>
        <Text style={[styles.textTime, { color }]} numberOfLines={1}>
          {t(!disable ? 'Please trade' : 'Wait time')}
        </Text>
        <Text style={[styles.textTime, { color }]}>{time}s</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleOrder('buy')}
        disabled={disable || order.loading}
        style={[styles.button,
        {
          backgroundColor: disable ? COLOR.gray4 : theme.colors.greenNen
        }]}
      >
        {order.loading ? <LoadingWhite /> :
          <>
            <Text style={[styles.textButton, { color: disable ? COLOR.white : colors.white }]}>
              {t('BUY')}
            </Text>
            <Image
              source={require('@images/trade/rise_up.png')}
              style={[styles.imageButton, { tintColor: disable ? COLOR.white : colors.white }]}
            />
          </>
        }
      </TouchableOpacity>
      <ToastOrder ref={toastRef} />
      <ModalWin isShow={isShowModalWin} profit={profit} />
    </View>
  )
}

export default BuyOrSell

const styles = StyleSheet.create({
  textTime: {
    fontWeight: 'bold',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10.
  },
  button: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 5,
  },
  imageButton: {
    width: 20,
    height: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  }
})