import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const Symbol = () => {
  const COLOR = colors[useSelector(themeUserSelector)]

  return (
    <View style={[styles.container, { backgroundColor: COLOR.border1 }]}>
      <Image
        source={require('@images/crypto/bitcoin.png')}
        style={styles.img}
      />
      <Text style={styles.txt}>BTC/USDT</Text>
    </View>
  )
}

export default Symbol

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  txt: {
    color: 'white'
  },
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
  }
})