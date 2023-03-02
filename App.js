import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Container from '@navigation/Container'

const App = () => {
  return (
    <SafeAreaProvider>
      <Container />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})