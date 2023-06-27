import React from 'react'
import Box from '@commom/Box'
import { Button } from 'react-native'
import { useDispatch } from 'react-redux'
import tradingSlice from '@slice/tradingSlice'
import { height, width } from '@util/responsive'

const COIN = 'BTCUSDT'
const SIZE_CHART = 17
const HEIGHT_SVG = height * 50 / 100
const HEIGHT_CANLES = HEIGHT_SVG - 70
const GAP_CANDLE = width * 4.55 / 100
const WIDTH_CANDLE = width * 3.052 / 100
const PADDING_TOP = 15
const HEIGHT_VOLUME = HEIGHT_CANLES + PADDING_TOP + 10

const Controller = () => {
    const dispatch = useDispatch()
    const push = () => {
        const data = {
            "buy": 0,
            "buyer": 75965,
            "close": 30377,
            "open": 30355,
            "high": 30377,
            "low": 30355,
            "closeBuy": 0,
            "closeCandlestick": 0,
            "closeSell": 0,
            "id": Math.random(),
            "idChart": 0,
            "order": 1,
            "orderAuto": 1,
            "orderBuy": 0,
            "orderSell": 0,
            "ramdomNumberVol": 7,
            "sell": 0,
            "seller": 83992,
            "symbol": "BTCUSDT",
            "timestamp": 1687830810,
            "volume": 50
        }

        dispatch(
            tradingSlice.actions.setLastChart({
                ...data,
                HEIGHT_CANLES,
                PADDING_TOP,
                GAP_CANDLE,
                HEIGHT_SVG,
                HEIGHT_VOLUME,
                SIZE_CHART
            })
        )
    }

    const pushHihgClose = () => {
        const data = {
            "buy": 0,
            "buyer": 75965,
            "close": 30400,
            "open": 30000,
            "high": 30400,
            "low": 30000,
            "closeBuy": 0,
            "closeCandlestick": 0,
            "closeSell": 0,
            "id": Math.random(),
            "idChart": 0,
            "order": 1,
            "orderAuto": 1,
            "orderBuy": 0,
            "orderSell": 0,
            "ramdomNumberVol": 7,
            "sell": 0,
            "seller": 83992,
            "symbol": "BTCUSDT",
            "timestamp": 1687830810,
            "volume": 50
        }

        dispatch(
            tradingSlice.actions.setLastChart({
                ...data,
                HEIGHT_CANLES,
                PADDING_TOP,
                GAP_CANDLE,
                HEIGHT_SVG,
                HEIGHT_VOLUME,
                SIZE_CHART
            })
        )
    }

    const pushLowClose = () => {
        const data = {
            "buy": 0,
            "buyer": 75965,
            "close": 32.25,
            "open": 100,
            "high": 100,
            "low": 20,
            "closeBuy": 0,
            "closeCandlestick": 0,
            "closeSell": 0,
            "id": 437543876,
            "idChart": 0,
            "order": 1,
            "orderAuto": 1,
            "orderBuy": 0,
            "orderSell": 0,
            "ramdomNumberVol": 7,
            "sell": 0,
            "seller": 83992,
            "symbol": "BTCUSDT",
            "timestamp": 1687830810,
            "volume": 150
        }

        dispatch(
            tradingSlice.actions.setLastChart({
                ...data,
                HEIGHT_CANLES,
                PADDING_TOP,
                GAP_CANDLE,
                HEIGHT_SVG,
                HEIGHT_VOLUME,
                SIZE_CHART,
            })
        )
    }

    return (
        <Box row wrap>
            <Button
                onPress={push}
                title='push'
            />
            <Button
                onPress={pushHihgClose}
                title='push high close'
            />
            <Button
                onPress={pushLowClose}
                title='push low close'
            />
        </Box>
    )
}

export default Controller