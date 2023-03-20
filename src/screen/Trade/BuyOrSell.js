import { orderThunk } from '@asyncThunk/tradeAsyncThunk'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import LoadingWhite from '@reuse/LoadingWhite'
import { amountTradeSelector, loadingTradeSelector, timeTradeSelector } from '@selector/tradeSelector'
import { typeUserSelector } from '@selector/userSelector'
import { theme } from '@theme/index'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ToastOrder from './ToastOrder'

const BuyOrSell = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const timeServer = useSelector(timeTradeSelector)
  const amount = useSelector(amountTradeSelector)
  const type = useSelector(typeUserSelector)
  const loading = useSelector(loadingTradeSelector)
  const toastRef = useRef(null)

  const time = timeServer > 30 ? 61 - timeServer : 31 - timeServer
  const color = (timeServer >= 1 && timeServer <= 30) ? theme.colors.greenNen : theme.colors.redNen
  const disable = color === theme.colors.greenNen ? false : true

  const handleOrder = async (side) => {
    const { payload } = await dispatch(
      orderThunk({
        symbol: 'BTCUSDT',
        type,
        side,
        amount,
        api: 'order',
      })
    )
    toastRef.current?.slide(payload)
    if (payload.status) {
      dispatch(getProfileThunk())
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleOrder('sell')}
        disabled={disable || loading}
        style={[
          styles.button,
          { backgroundColor: disable ? theme.colors.gray5 : theme.colors.redNen }
        ]}
      >
        {loading ? <LoadingWhite /> :
          <>
            <Text style={styles.textButton}>{t('SELL')}</Text>
            <Image
              source={require('@images/trade/rise_down.png')}
              style={styles.imageButton}
            />
          </>
        }
      </TouchableOpacity>

      <View style={styles.timeContainer}>
        <Text style={[styles.textTime, { color }]} numberOfLines={1}>
          {t(!disable ? 'Please trade' : 'Wait time')}
        </Text>
        <Text style={[styles.textTime, { color }]}>{time}s</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleOrder('buy')}
        disabled={disable || loading}
        style={[styles.button,
        {
          backgroundColor: disable ? theme.colors.gray5 : theme.colors.greenNen
        }]}
      >
        {loading ? <LoadingWhite /> :
          <>
            <Text style={styles.textButton}>{t('BUY')}</Text>
            <Image
              source={require('@images/trade/rise_up.png')}
              style={styles.imageButton}
            />
          </>
        }
      </TouchableOpacity>
      <ToastOrder ref={toastRef} />
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
  },
  button: {
    flexDirection: 'row',
    height: '100%',
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
    flex: 1,
    paddingTop: 5,
  }
})