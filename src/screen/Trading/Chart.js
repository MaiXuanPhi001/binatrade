import { getChartThunk } from '@asyncThunk/tradingAsyncThunk'
import { height, width } from '@util/responsive'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'react-native-svg'
import { useDispatch } from 'react-redux'
import Candles from './Candles'
import LineX from './LineX'

const COIN = 'BTCUSDT'
const HEIGHT_SVG = height * 50 / 100
const HEIGHT_CANLES = HEIGHT_SVG - 100
const GAP_CANDLE = width * 4.55 / 100
const WIDTH_CANDLE = width * 3.052 / 100

const Chart = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        handleGetChart()
    }, [])

    const handleGetChart = async () => {
        await dispatch(getChartThunk({
            symbol: COIN,
            size_chart: 20,
            heigh_candle: HEIGHT_CANLES,
        }))
    }

    return (
        <View>
            <Svg width={'100%'} height={HEIGHT_SVG} >
                <Candles
                    {...{
                        GAP_CANDLE,
                        WIDTH_CANDLE
                    }}
                />
                <LineX
                    {...{
                        HEIGHT_CANLES
                    }}
                />
            </Svg>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})