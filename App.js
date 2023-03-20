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

