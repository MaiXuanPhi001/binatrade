import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from 'react-native-progress/Bar'

const PercentBuyAndSell = () => {
    return (
        <View style={styles.container}>
            <ProgressBar
                progress={0.5}
                width={200}
                color={'#1BBD61'}
                unfilledColor={'#E93555'}
                height={5}
                borderRadius={5}
                borderWidth={0}
            />
        </View>
    )
}

export default PercentBuyAndSell

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    }
})