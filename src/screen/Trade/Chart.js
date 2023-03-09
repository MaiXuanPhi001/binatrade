import { StyleSheet, View } from 'react-native'
import React from 'react'
import Candlestick from './Candlestick'
import Line from './Line'
import Close from './Close'
import PercentBuyAndSell from './PercentBuyAndSell'

const Chart = () => {
  return (
    <View style={styles.container}>
      <View>
        <Line />
        <Candlestick />
        <PercentBuyAndSell />
      </View>
      <Close />
    </View>
  )
}

export default Chart

const styles = StyleSheet.create({
  container: {
    height: '58%',
    flexDirection: 'row',
    marginTop: 10,
  }
})