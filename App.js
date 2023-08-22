import Container from '@navigation/Container'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <Container />
    </SafeAreaProvider>
  )
}

export default App

// import { View, Text, NativeModules, Button } from 'react-native'
// import React from 'react'
// import { result } from 'lodash'

// // console.log(NativeModules.Counter)
// // NativeModules.Counter.increment((value) => {
// //   console.log('the count is ' + value)
// // })
// // console.log(NativeModules.Counter.getConstants())

// const App = () => {
//   const decrement = async () => {
//     try {
//       var result = await NativeModules.Counter.decrement()
//       console.log(result)
//     } catch (e) {
//       console.log(e.message, e.code)
//     }
//     // NativeModules.Counter.decrement()
//     //   .then(result => console.log(result))
//     //   .catch(e => console.log(e.message, e.code))
//   }

//   const pushNotification = () => {
//     NativeModules.Counter.pushNotifi()
//   }

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>App</Text>
//       <Button title='Decrease Count' onPress={decrement} />
//       <Button
//         title='Push notification'
//         onPress={pushNotification}
//       />
//     </View>
//   )
// }

// export default App

