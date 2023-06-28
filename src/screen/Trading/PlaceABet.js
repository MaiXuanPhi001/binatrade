import { StyleSheet, View } from 'react-native'
import React from 'react'
import Amount from './Amount'
import BuyOrSell from './BuyOrSell'

const PlaceABet = () => {
  return (
    <View style={styles.container}>
      <Amount />
      <BuyOrSell />
    </View>
  ) 
}

export default PlaceABet

const styles = StyleSheet.create({
    // container: {
    //     height: '12%',
    // }
})