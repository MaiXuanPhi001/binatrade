import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { width } from '@util/responsive'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'

const Withdraw = () => {
  return (
    <View style={styles.container}>
      <Txt>Withdraw</Txt>
    </View>
  )
}

export default Withdraw

const styles = StyleSheet.create({
  container: {
    width: width - 43,
    borderWidth: 1,
    borderColor: theme.colors.gray5,
    padding: 10,
    borderRadius: 10,
  }
})