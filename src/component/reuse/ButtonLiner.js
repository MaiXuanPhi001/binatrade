import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import LoadingWhite from './LoadingWhite'

const ButtonLiner = ({
    onPress,
    text,
    height = 45,
    width = '100%',
    marginTop,
    size = 16,
    loading,
}) => {
    return (
        <Btn
            onPress={onPress}
            radius={10}
            height={height}
            width={width}
            marginTop={marginTop}
            disabled={loading}
        >
            <LinearGradient
                colors={['#1998e6', '#4cb0d9', '#7ccdc9']}
                style={styles.linear}
            >
                {loading ?
                    <LoadingWhite /> :
                    <Txt bold color='white' size={size}>
                        {text}
                    </Txt>
                }
            </LinearGradient>
        </Btn>
    )
}

export default ButtonLiner

const styles = StyleSheet.create({
    linear: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
})