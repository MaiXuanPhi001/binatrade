import { getProfileMegaPoolAfterThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { lastWinnerUserSelector, prizePoolUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WIDTH_CONTAINER = width * 65 / 100
const SIZE_IMG = width * 20 / 100
const HEIGHT_IMG_PRIZE4 = width * 12 / 100

const Treasure = () => {
    const dispatch = useDispatch()
    const prizePool = useSelector(prizePoolUserSelector)
    const lastWinner = useSelector(lastWinnerUserSelector)

    useEffect(() => {
        handleGetProfileMegaPoolAfter()
    }, [])

    const handleGetProfileMegaPoolAfter = async () => {
        await dispatch(getProfileMegaPoolAfterThunk())
    }

    return (
        <Box
            backgroundColor={'#170c40'}
            height={width * 30 / 100}
            width={WIDTH_CONTAINER}
            radius={25}
            borderWidth={2}
            borderColor={'#5327d8'}
            justifyCenter
            marginTop={-25}
        >
            <Box row alignCenter justifySpaceBetween>
                <Img
                    source={require('@images/prize/prize1.png')}
                    width={SIZE_IMG}
                    height={SIZE_IMG}
                    marginLeft={-(SIZE_IMG / 2)}
                />
                <Txt size={25} fontFamily={fonts.Frizon} color={colors.yellow2}>
                    ${numberCommasDot(prizePool[0]?.value?.toFixed(1))}
                </Txt>
                <Img
                    source={require('@images/prize/prize2.png')}
                    width={SIZE_IMG + 10}
                    height={SIZE_IMG + 10}
                    marginRight={-(SIZE_IMG / 2)}
                />
            </Box>
            <Box
                absolute
                width={WIDTH_CONTAINER}
                alignCenter
                bottom={-(HEIGHT_IMG_PRIZE4 / 1.4)}
            >
                <Img
                    source={require('@images/prize/prize4.png')}
                    width={WIDTH_CONTAINER - 10}
                    height={HEIGHT_IMG_PRIZE4}
                    resizeMode={'contain'}
                />
                <Box absolute height={'75%'} justifyCenter>
                    <Txt fontFamily={fonts.Frizon} color={'#b100ff'}>
                        ${numberCommasDot(lastWinner.megaPoolAfter)}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Treasure