import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { width } from '@util/responsive'
import { theme } from '@theme/index'

const Amount = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>-</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput 
                    keyboardType={'number-pad'}
                    style={styles.input}
                />
                <View style={styles.dollarContainer}>
                    <Text style={styles.dollar}>$</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
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