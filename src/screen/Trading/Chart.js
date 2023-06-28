import { getChartThunk } from '@asyncThunk/tradingAsyncThunk'
import tradingSlice from '@slice/tradingSlice'
import contants from '@util/contants'
import { height, width } from '@util/responsive'
import { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'react-native-svg'
import { useDispatch } from 'react-redux'
import socketIOClient from 'socket.io-client'
import Candles from './Candles'
import LineX from './LineX'

const COIN = 'BTCUSDT'
const SIZE_CHART = 17
const HEIGHT_SVG = height * 50 / 100
const HEIGHT_CANLES = HEIGHT_SVG - 100
const GAP_CANDLE = width * 4.55 / 100
const WIDTH_CANDLE = width * 3.052 / 100
const PADDING_TOP = 15
const HEIGHT_VOLUME = HEIGHT_CANLES + PADDING_TOP + 40
const WIDTH_CANDLES = width - (width - (GAP_CANDLE * (SIZE_CHART - 1))) + (WIDTH_CANDLE / 2)

const Chart = () => {
    const dispatch = useDispatch()
    const socketRef = useRef()

    useEffect(() => {
        handleGetChart()

        let timeSocket = 0
        socketRef.current = socketIOClient.connect(contants.HOSTING)
        socketRef.current.on('TIME', time => {
            timeSocket = time
        })

        socketRef.current.on(COIN, data => {
            if (data) {
                dispatch(
                    tradingSlice.actions.setLastChart({
                        ...data,
                        HEIGHT_CANLES,
                        PADDING_TOP,
                        GAP_CANDLE,
                        HEIGHT_SVG,
                        HEIGHT_VOLUME,
                        SIZE_CHART,
                        timeSocket,
                    })
                )
            }
        })

        return () => socketRef?.current?.disconnect()
    }, [])

    const handleGetChart = async () => {
        await dispatch(
            getChartThunk({
                symbol: COIN,
                size_chart: SIZE_CHART,
                heigh_candle: HEIGHT_CANLES,
                paddingTop: PADDING_TOP,
                gap_candle: GAP_CANDLE,
                height_volume: HEIGHT_VOLUME,
                height_svg: HEIGHT_SVG,
            })
        )
    }

    return (
        <View>
            <Svg width={'100%'} height={HEIGHT_SVG}>
                <LineX
                    {...{
                        HEIGHT_CANLES,
                        PADDING_TOP,
                    }}
                />

                <Candles
                    {...{
                        GAP_CANDLE,
                        WIDTH_CANDLE,
                        WIDTH_CANDLES,
                        HEIGHT_SVG,
                        SIZE_CHART,
                        PADDING_TOP,
                    }}
                />

                {/* <Line
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
                /> */}
            </Svg>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({})