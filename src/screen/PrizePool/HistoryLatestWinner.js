import { getListStreakThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux'
import MettLatestWinner from './MettLatestWinner'
import TabHistory from './TabHistory'
import WinningHistory from './WinningHistory'

const HistoryLatestWinner = () => {
  const dispatch = useDispatch()
  const [tab, setTab] = useState('winning')

  useEffect(() => {
    handleGetDataFromApi()
  }, [])

  const handleGetDataFromApi = async () => {
    await dispatch(getListStreakThunk({
      limit: 10,
      page: 1,
    }))
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
          <WinningHistory />
        </Box>
      </ImageBackground>
    </Box>
  )
}

export default HistoryLatestWinner