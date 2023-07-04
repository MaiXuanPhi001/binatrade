import { orderTradingSelector } from '@selector/tradingSelector'
import { themeUserSelector } from '@selector/userSelector'
import tradingSlice from '@slice/tradingSlice'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Amount = () => {
    const dispatch = useDispatch()
    const order = useSelector(orderTradingSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

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
                style={[styles.button, { backgroundColor: COLOR.gray4 }]}
            >
                <Text style={[styles.textButton, { color: COLOR.white }]}>-</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput
                    value={order.amount.toString()}
                    onChangeText={text => dispatch(tradingSlice.actions.setOrder({
                        ...order,
                        amount: Number(text),
                    }))}
                    keyboardType={'decimal-pad'}
                    style={[styles.input, { backgroundColor: COLOR.white3 }]}
                />
                <View style={[styles.dollarContainer, { borderColor: colors.gray2 }]}>
                    <Text style={[styles.dollar, { color: COLOR.white }]}>$</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => handleChangeAmount('+')}
                style={[styles.button, { backgroundColor: COLOR.gray4 }]}
            >
                <Text style={[styles.textButton, { color: COLOR.white }]}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Amount

const styles = StyleSheet.create({
    dollar: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    dollarContainer: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
    },
    input: {
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
        fontWeight: 'bold'
    },
    button: {
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