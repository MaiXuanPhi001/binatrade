import { getListStreakThunk, getPrizePoolUserThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux'
import MettLatestWinner from './MettLatestWinner'
import TabHistory from './TabHistory'
import WinningHistory from './WinningHistory'
import YourHistory from './YourHistory'

const HistoryLatestWinner = () => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState('winning')

  useEffect(() => {
    handleGetDataFromApi()
  }, [])

  const handleGetDataFromApi = async () => {
    const req = {
        limit: 10,
        page: 1,
    }
    await dispatch(getListStreakThunk(req))
    await dispatch(getPrizePoolUserThunk(req))
  }

  return (
    <Box>
      <ImageBackground
        source={require('@images/prize/bg-middle.png')}
        style={{ paddingBottom: 100 }}
      >
        <MettLatestWinner />
        <Box paddingHorizontal={15}>
          <TabHistory {...{ tab, setTab }} />
          {
            tab === 'winning' ?
              <WinningHistory /> : <YourHistory />  
          }
        </Box>
      </ImageBackground>
    </Box>
  )
}

export default HistoryLatestWinner