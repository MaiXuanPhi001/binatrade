import { View } from 'react-native'
import React, { memo } from 'react'
import TextClose from './TextClose'
import { HEIGHT_CHART } from './Candlestick'

const CloseValue = ({ highChart, lowChart }) => {
    const threeClose = HEIGHT_CHART / 2 - 6
    const twoClose = threeClose / 2 + 1
    const fourClose = (HEIGHT_CHART - threeClose) / 2 + threeClose - 8

    const valueThree = (highChart - lowChart) / 2 + lowChart
    const valueTwo = (highChart - valueThree) / 2 + valueThree
    const valueFour = (valueThree - lowChart) / 2 + lowChart

    return (
        <View>
            <TextClose value={highChart} top={3} />
            <TextClose value={valueTwo} top={twoClose} />
            <TextClose value={valueThree} top={threeClose} />
            <TextClose value={valueFour} top={fourClose} />
            <TextClose value={lowChart} top={HEIGHT_CHART - 16} />
        </View>
    )
}

export default memo(CloseValue)