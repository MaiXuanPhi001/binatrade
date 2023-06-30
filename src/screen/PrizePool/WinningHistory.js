import { getListStreakThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import NoDataTable from '@reuse/NoDataTable'
import Pagination from '@reuse/Pagination'
import { winningHistoryFundingSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { useDispatch, useSelector } from 'react-redux'

const SIZE_TEXT = 15

const WinningHistory = () => {
    const dispatch = useDispatch()
    const winningHistory = useSelector(winningHistoryFundingSelector)

    const hideName = (userName) => {
        const nameSlice = userName.slice(1, userName.length).replace(/./g, '*')
        return userName[0] + nameSlice
    }

    const handleGetListStreakThunk = async (page) => {
        await dispatch(getListStreakThunk({
            limit: 10,
            page: page,
        }))
    }

    return (
        <Box backgroundColor={colors.black1} marginTop={10} paddingBottom={10}>
            {winningHistory.loading ?
                <LoadingWhite /> :
                <>
                    {
                        winningHistory.data.length > 0 ?
                            <>
                                {winningHistory.data.map(history => {
                                    const win = history.streak === 'win' ? true : false

                                    return (
                                        <Box
                                            key={history.id}
                                            width={'100%'}
                                            padding={10}
                                            borderBottomWidth={1}
                                            borderColor={'#2c2d2e'}
                                        >
                                            <Box row>
                                                <Box flex={1}>
                                                    <Txt
                                                        size={SIZE_TEXT}
                                                        bold
                                                        color={win ? colors.green3 : colors.red4}
                                                    >
                                                        {win ? 'Win Streak 15x' : 'Lose Streak 15x'}
                                                    </Txt>
                                                </Box>
                                                <Box flex={1}>
                                                    <Txt size={SIZE_TEXT}>
                                                        {hideName(history.userName)}
                                                    </Txt>
                                                </Box>
                                            </Box>

                                            <Box row marginTop={5}>
                                                <Box flex={1}>
                                                    <Txt bold size={SIZE_TEXT}>
                                                        $ {history.amount}
                                                    </Txt>
                                                </Box>
                                                <Box flex={1}>
                                                    <Txt size={SIZE_TEXT}>
                                                        {history.created_at}
                                                    </Txt>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </>
                            :
                            <NoDataTable style={{ marginTop: 20 }} />
                    }

                    <Pagination
                        marginTop={10}
                        indexPage={winningHistory.page}
                        total={winningHistory.total}
                        onNext={() => handleGetListStreakThunk(winningHistory.page + 1)}
                        onBack={() => handleGetListStreakThunk(winningHistory.page - 1)}
                    />
                </>
            }
        </Box>
    )
}

export default WinningHistory