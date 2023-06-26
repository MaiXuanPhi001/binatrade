import { getChartThunk } from '@asyncThunk/tradingAsyncThunk'
import { height, width } from '@util/responsive'
import { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Line, Svg } from 'react-native-svg'
import { useDispatch } from 'react-redux'
import Candles from './Candles'
import LineX from './LineX'
import tradingSlice from '@slice/tradingSlice'
import socketIOClient from 'socket.io-client'
import contants from '@util/contants'

const COIN = 'BTCUSDT'
const HEIGHT_SVG = height * 50 / 100
const HEIGHT_CANLES = HEIGHT_SVG - 70
const GAP_CANDLE = width * 4.55 / 100
const WIDTH_CANDLE = width * 3.052 / 100
const PADDING_TOP = 15
const HEIGHT_VOLUME = HEIGHT_CANLES + PADDING_TOP + 10
console.log('HEIGHT_VOLUME: ', HEIGHT_VOLUME)
console.log('HEIGHT_SVG: ', HEIGHT_SVG -  HEIGHT_VOLUME)

const Chart = () => {
    const dispatch = useDispatch()
    const socketRef = useRef()

    useEffect(() => {
        handleGetChart()

        socketRef.current = socketIOClient.connect(contants.HOSTING)
        socketRef.current.on(COIN, data => {
            // if (data) {
            //     dispatch(
            //         tradingSlice.actions.setLastChart({
            //             ...data,
            //             HEIGHT_CANLES,
            //             PADDING_TOP,
            //             GAP_CANDLE,
            //         })
            //     )
            // }
        })

        return () => socketRef?.current?.disconnect()
    }, [])

    const handleGetChart = async () => {
        await dispatch(
            getChartThunk({
                symbol: COIN,
                size_chart: 15,
                heigh_candle: HEIGHT_CANLES,
                paddingTop: PADDING_TOP,
                gap_candle: GAP_CANDLE,
                height_volume: HEIGHT_VOLUME,
                height_svg: HEIGHT_SVG
            })
        )
    }

    return (
        <View>
            <Svg width={'100%'} height={HEIGHT_SVG}>
                <Candles
                    {...{
                        GAP_CANDLE,
                        WIDTH_CANDLE,
                        HEIGHT_SVG,
                        HEIGHT_VOLUME,
                    }}
                />
                <LineX
                    {...{
                        HEIGHT_CANLES,
                        PADDING_TOP,
                    }}
                />

                <Line
                    key={`SVG_Line`}
                    x1={0}
                    y1={HEIGHT_SVG}
                    x2={width}
                    y2={HEIGHT_SVG}
                    stroke={'white'}
                    strokeWidth={0.5}
                />
                <Line
                    key={`SVG_Line2`}
                    x1={0}
                    y1={0}
                    x2={width}
                    y2={0}
                    stroke={'white'}
                    strokeWidth={0.5}
                />
            </Svg>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})