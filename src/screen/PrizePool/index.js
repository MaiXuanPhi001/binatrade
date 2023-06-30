import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import SteakChallenge from './SteakChallenge'
import HistoryLatestWinner from './HistoryLatestWinner'
import Guidelines from './Guidelines'

const PrizePool = ({ navigation }) => {
    return (
        <KeyBoardSafe paddingBottom={0}>
            <Header navigation={navigation} />
            <SteakChallenge />
            <HistoryLatestWinner />
            <Guidelines />
        </KeyBoardSafe>
    )
}

export default PrizePool