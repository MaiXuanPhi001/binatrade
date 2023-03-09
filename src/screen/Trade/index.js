import React from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Header from '@reuse/Header'
import Chart from './Chart'
import Statistical from './Statistical'
import PlaceABet from './PlaceABet'
import Symbol from './Symbol'
import { View } from 'react-native'
import Socket from './Socket'
import { useSelector } from 'react-redux'
import { screenChooseUserSelector } from '@selector/userSelector'
import routes from '@util/routes'

const Trade = ({ navigation }) => {
  const screenChoose = useSelector(screenChooseUserSelector)
  
  return (
    <KeyBoardSafe paddingBottom={0}>
      <Header navigation={navigation} />
      {screenChoose === routes.TRADE &&
        <View style={{ paddingHorizontal: 5 }}>
          <Socket />
          <Symbol />
          <Chart />
          <Statistical />
          <PlaceABet />
        </View>
      }
    </KeyBoardSafe >
  )
}

export default Trade