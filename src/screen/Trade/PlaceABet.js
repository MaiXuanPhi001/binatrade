import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'

const PlaceABet = () => {
  return (
    <View style={styles.container}>
      <Text>PlaceABet</Text>
    </View>
  )
}

export default PlaceABet

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        height: '14%',
    }
})