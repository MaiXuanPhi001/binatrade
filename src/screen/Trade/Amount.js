import { amountTradeSelector } from '@selector/tradeSelector'
import tradeSlice from '@slice/tradeSlice'
import { theme } from '@theme/index'
import { width } from '@util/responsive'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Amount = () => {
    const dispatch = useDispatch()
    const amount = useSelector(amountTradeSelector)

    const handleChangeAmount = (action) => {
        let price = action === '+' ? amount + 5 : amount - 5
        dispatch(tradeSlice.actions.changeAmount(price < 0 ? 0 : price))
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
                    value={amount.toString()}
                    onChangeText={txt => dispatch(tradeSlice.actions.changeAmount(txt))}
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