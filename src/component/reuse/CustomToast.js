import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Img from '@commom/Img';
import Txt from '@commom/Txt';
// import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('screen').width;

const CustomToast = ({ type, title }) => {

    return (
        <View style={[styles.toastBox]}>
            <Img
                width={30}
                height={30}
                marginRight={10}
                source={type === 'success' ?
                    require('@images/check.png') :
                    require('@images/remove.png')}
            />
            <Txt bold>{title}</Txt>
        </View>
    );
};

export default CustomToast;

const styles = StyleSheet.create({
    toastBox: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 6,
        elevation: 1,
        marginHorizontal: 10,
    }
});
