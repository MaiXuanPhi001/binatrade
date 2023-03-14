import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'
import { useSelector } from 'react-redux'
import { timeTradeSelector } from '@selector/tradeSelector'

const BuyOrSell = () => {
  const timeServer = useSelector(timeTradeSelector)
  const time = timeServer > 30 ? 61 - timeServer : 31 - timeServer
  const color = (timeServer >= 1 && timeServer <= 30) ? theme.colors.greenNen : theme.colors.redNen
  const disable = color === theme.colors.greenNen ? false : true

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disable}
        style={[
          styles.button,
          { backgroundColor: disable ? theme.colors.gray5 : theme.colors.redNen }
        ]}
      >
        <Text style={styles.textButton}>SELL</Text>
        <Image
          source={require('@images/trade/rise_down.png')}
          style={styles.imageButton}
        />
      </TouchableOpacity>

      <View style={styles.timeContainer}>
        <Text style={[styles.textTime, { color }]}>Please trade</Text>
        <Text style={[styles.textTime, { color }]}>{time}s</Text>
      </View>

      <TouchableOpacity
        disabled={disable}
        style={[styles.button,
        {
          backgroundColor: disable ? theme.colors.gray5 : theme.colors.greenNen
        }]}
      >
        <Text style={styles.textButton}>BUY</Text>
        <Image
          source={require('@images/trade/rise_up.png')}
          style={styles.imageButton}
        />
      </TouchableOpacity>
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