import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Symbol = () => {
    return (
        <View style={styles.container}>
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
        backgroundColor: '#33404e',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 5,
        padding: 5,
      }
})