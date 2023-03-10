import { dataDotTradeSelector } from '@selector/tradeSelector'
import { theme } from '@theme/index'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import EvenAndOdd from './EvenAndOdd'

const Statistical = () => {
  const dots = useSelector(dataDotTradeSelector)

  return (
    <View style={styles.container}>
      <EvenAndOdd
        dots={dots}
      />
    </View>
  )
}

export default Statistical

const styles = StyleSheet.create({
  container: {
    height: '17%',
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderColor: theme.colors.gray,
    paddingTop: 5
  }
})