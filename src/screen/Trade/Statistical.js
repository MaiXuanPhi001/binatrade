import { dataDotTradeSelector } from '@selector/tradeSelector'
import { theme } from '@theme/index'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import EvenAndOdd from './EvenAndOdd'
import Profit from './Profit'

const Statistical = () => {
  const dots = useSelector(dataDotTradeSelector)

  return (
    <View style={styles.container}>
      <EvenAndOdd
        dots={dots}
      />
      <Profit />
    </View>
  )
}

export default Statistical

const styles = StyleSheet.create({
  container: {
    height: '19%',
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderColor: theme.colors.gray,
    paddingTop: 5
  }
})