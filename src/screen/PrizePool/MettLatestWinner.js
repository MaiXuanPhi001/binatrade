import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { getPreviousDay } from '@method/date'
import { numberCommasDot } from '@method/format'
import { lastWinnerUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'

const MettLatestWinner = () => {
    const latestWinner = useSelector(lastWinnerUserSelector)

    return (
        <Box alignCenter>
            <Txt marginTop={80} size={15} bold color='#55577d'>
                Meet The Lastest Winners
            </Txt>
            <Txt marginTop={15} fontFamily={fonts.Frizon} size={25}>
                LATEST WINNERS
            </Txt>

            <Box marginTop={40} alignCenter>
                <LinearGradient
                    colors={['#0e081b', '#2b1c01', '#2b1c01']}
                    style={styles.linearMegaJackpot}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Txt bold color={colors.yellow3} size={13}>MEGA JACKPOT WINNER</Txt>
                </LinearGradient>
                <LinearGradient
                    colors={['#1d111c', '#794900', '#3b2900']}
                    style={styles.linearUserMega}
                >
                    <Txt bold color={colors.yellow3} size={20}>
                        {latestWinner.userNameMegaPool.toUpperCase()}
                    </Txt>
                    <Txt color={colors.white} size={17} marginTop={5}>
                        {`Won Mega Prizes ${getPreviousDay()}`}
                    </Txt>
                </LinearGradient>
                <Box
                    alignCenter
                    marginTop={-15}
                >
                    <Img
                        source={require('@images/prize/prize4.png')}
                        width={width * 70 / 100}
                        height={60}
                        resizeMode={'contain'}
                    />
                    <Box absolute justifyCenter height={'67%'}>
                        <Txt fontFamily={fonts.Frizon} size={16} color={'#b100ff'}>
                            ${numberCommasDot(latestWinner.megaPoolAfter?.toFixed(2))}
                        </Txt>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MettLatestWinner

const styles = StyleSheet.create({
    linearMegaJackpot: {
        width: width * 60 / 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.yellow3,
        borderRadius: 10,
        marginBottom: -15,
        zIndex: 1,
    },
    linearUserMega: {
        width: width * 80 / 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.yellow3,
        borderRadius: 30,
    }
})