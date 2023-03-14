import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { screenChooseUserSelector } from '@selector/userSelector'
import routes from '@util/routes'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import Chart from './Chart'
import PlaceABet from './PlaceABet'
import Socket from './Socket'
import Statistical from './Statistical'
import Symbol from './Symbol'

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