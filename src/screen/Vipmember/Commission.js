import Box from '@commom/Box'
import SearchDay from './SearchDay'
import TradingPayoutChart from './TradingPayoutChart'
import TradingPayoutDetails from './TradingPayoutDetails'

const Commission = () => {
  return (
    <Box marginTop={15}>
      <SearchDay />
      <TradingPayoutChart />
      <TradingPayoutDetails />
    </Box>
  )
}

export default Commission