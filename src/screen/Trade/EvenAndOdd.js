import { theme } from '@theme/index'
import { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import DotItem from './DotItem'

const EvenAndOdd = ({ dots }) => {
    let postion = 0

    return (
        <View style={styles.container}>
            <View style={styles.sumContainer}>
                <View style={styles.sumContent}>
                    <Image
                        source={require('@images/trade/arrows_up_green.png')}
                        style={styles.image}
                    />
                    <Text style={styles.sumText}>18</Text>
                </View>
                <View style={styles.sumContent}>
                    <Image
                        source={require('@images/trade/arrows_down_red.png')}
                        style={styles.image}
                    />
                    <Text style={styles.sumText}>29</Text>
                </View>
            </View>

            <View style={styles.dotContainer}>
                {dots.map((color, index) => {
                    postion++
                    let marginEnable = false
                    if (postion == 17 || postion == 18 || postion == 19 || postion == 20) {
                        marginEnable = true
                        if (postion == 20) {
                            postion = 0
                        }
                    }
                    return (
                        <DotItem
                            key={index}
                            color={color}
                            marginEnable={marginEnable}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default memo(EvenAndOdd)

const styles = StyleSheet.create({
    dotContainer: {
        flexWrap: 'wrap',
        height: 80,
        justifyContent: 'center',
    },
    sumText: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 18,
        height: 18,
        marginRight: 7,
    },
    sumContent: {
        backgroundColor: theme.colors.gray5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
        marginHorizontal: 5
    },
    sumContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },
    container: {
        width: '100%',
        alignItems: 'center',
    }
})