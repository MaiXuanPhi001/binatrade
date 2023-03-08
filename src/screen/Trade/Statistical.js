import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '@theme/index'

const Statistical = () => {
  return (
    <View style={styles.container}>
      <Text>Statistical</Text>
    </View>
  )
}

export default Statistical

const styles = StyleSheet.create({
    container: {
        height: '17%',
        backgroundColor: theme.colors.background,
    }
})