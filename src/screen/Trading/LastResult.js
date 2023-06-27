import { tradeTradingSelector } from '@selector/tradingSelector'
import { theme } from '@theme/index'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import DotItem from './DotItem'

const LastResult = () => {
    const trade = useSelector(tradeTradingSelector)
    const dots = trade.slice(trade.length - 41, trade.length - 1)

    let postion = 0

    return (
        <View style={styles.container}>
            <View style={styles.sumContainer}>
                <View style={styles.sumContent}>
                    <Image
                        source={require('@images/trade/arrows_up_green.png')}
                        style={styles.image}
                    />
                    <Text style={styles.sumText}>{27}</Text>
                </View>
                <View style={styles.sumContent}>
                    <Image
                        source={require('@images/trade/arrows_down_red.png')}
                        style={styles.image}
                    />
                    <Text style={styles.sumText}>{26}</Text>
                </View>
            </View>

            <View style={styles.dotContainer}>
                {Array.from(new Array(60)).map((item, index) => {
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
                            color={item}
                            marginEnable={marginEnable}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default LastResult

const styles = StyleSheet.create({
    dotContainer: {
        flexWrap: 'wrap',
        height: 80,
        justifyContent: 'center',
        marginTop: 10
    },
    sumText: {
        fontSize: 13,
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
        marginTop: 10,
    }
})