import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import SteakChallenge from './SteakChallenge'
import HistoryLatestWinner from './HistoryLatestWinner'

const PrizePool = ({ navigation }) => {
    return (
        <KeyBoardSafe>
            <Header navigation={navigation} />
            <SteakChallenge />
            <HistoryLatestWinner />
        </KeyBoardSafe>
    )
}

export default PrizePool