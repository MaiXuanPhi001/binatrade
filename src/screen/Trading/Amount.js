import { orderTradingSelector } from '@selector/tradingSelector'
import tradingSlice from '@slice/tradingSlice'
import { theme } from '@theme/index'
import { width } from '@util/responsive'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Amount = () => {
    const dispatch = useDispatch()
    // const amount = useSelector(amountTradeSelector)
    const order = useSelector(orderTradingSelector)

    const handleChangeAmount = (action) => {
        let price = action === '+' ? order.amount + 5 : order.amount - 5
        dispatch(tradingSlice.actions.setOrder({
            ...order,
            amount: price < 0 ? 0 : price,
        }))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleChangeAmount('-')}
                style={styles.button}
            >
                <Text style={styles.textButton}>-</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    value={order.amount.toString()}
                    onChangeText={text => dispatch(tradingSlice.actions.setOrder({
                        ...order,
                        amount: Number(text),
                    }))}
                    keyboardType={'decimal-pad'}
                    style={styles.input}
                />
                <View style={styles.dollarContainer}>
                    <Text style={styles.dollar}>$</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => handleChangeAmount('+')}
                style={styles.button}
            >
                <Text style={styles.textButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Amount

const styles = StyleSheet.create({
    dollar: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
    },
    dollarContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.gray,
        borderRadius: 5,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 7,
        height: '100%',
        paddingHorizontal: 10,
        width: '80%',
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 60 / 100,
        marginHorizontal: 10,
        height: '100%',
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: theme.colors.gray5,
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 35,
    }
})