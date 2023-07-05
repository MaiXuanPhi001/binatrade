import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { loadingUser } from '@hooks/loading'
import { theme } from '@theme/index'
import React from 'react'
import LottieAnimation from './LottieAnimation'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native'
import LoadingWhite from './LoadingWhite'

const ButtonUser = ({
    onPress,
    text,
    height = 45,
    width = '100%',
    marginTop,
    size = 16,
    style,
}) => {
    return (
        <Btn
            onPress={onPress}
            radius={10}
            height={height}
            width={width}
            marginTop={marginTop}
            disabled={loadingUser()}
            style={style}
        >
            <LinearGradient
                colors={['#1998e6', '#4cb0d9', '#7ccdc9']}
                style={styles.linear}
            >
                {loadingUser() ?
                    <LoadingWhite /> :
                    <Txt bold color='white' size={size}>
                        {text}
                    </Txt>
                }
            </LinearGradient>
        </Btn>
    )
}

export default ButtonUser

const styles = StyleSheet.create({
    linear: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
})