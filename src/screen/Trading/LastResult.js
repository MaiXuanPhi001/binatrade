import { theme } from '@theme/index'
import { Image, StyleSheet, Text, View } from 'react-native'
import DotItem from './DotItem'
import { useSelector } from 'react-redux'
import { dotsTradingSelector } from '@selector/tradingSelector'
import { colors } from '@theme/colors'

const LastResult = () => {
    const dots = useSelector(dotsTradingSelector)

    let [redSum, greenSum] = [0, 0]
    for (let i = 0 ; i < dots.length ; i++) {
        (dots[i].close < dots[i].open) && redSum++
        (dots[i].close > dots[i].open) && greenSum++
    }
    
    let postion = 0

    return (
        <View style={styles.container}>
            <View style={styles.sumContainer}>
                <View style={styles.sumContent}>
                    <Image
                        source={require('@images/trade/arrows_up_green.png')}
                        style={styles.image}
                    />
                    <Text style={styles.sumText}>{greenSum}</Text>
                </View>
                <View style={styles.sumContent}>
                    <Image
                        source={require('@images/trade/arrows_down_red.png')}
                        style={styles.image}
                    />
                    <Text style={styles.sumText}>{redSum}</Text>
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

                    let color = '#33404e'

                    if (dots[index]) {
                        color = dots[index].close > dots[index].open ? colors.green2 :
                            dots[index].close < dots[index].open ? colors.red3 : colors.white
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