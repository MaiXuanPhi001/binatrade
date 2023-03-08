import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Candlestick from './Candlestick'
import Line from './Line'

const Chart = () => {
  return (
    <View style={styles.container}>
      <Line />
      <Candlestick />
    </View>
  )
}

export default Chart

const styles = StyleSheet.create({
  container: {
    height: '58%',
    // backgroundColor: 'red',
    marginTop: 10
  }
})