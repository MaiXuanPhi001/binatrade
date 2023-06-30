import { getPrizePoolUserThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import ButtonUser from '@reuse/ButtonUser'
import LoadingWhite from '@reuse/LoadingWhite'
import NoDataTable from '@reuse/NoDataTable'
import Pagination from '@reuse/Pagination'
import { yourHistoryFundingSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalConfirmPrizePoolUser from './ModalConfirmPrizePoolUser'

const YourHistory = () => {
    const dispatch = useDispatch()
    const yourHistory = useSelector(yourHistoryFundingSelector)

    const [isShowModal, setShowModal] = useState(false)
    const [history, setHistory] = useState({})

    const handleGetPrizePoolUserThunk = async (page) => {
        await dispatch(getPrizePoolUserThunk({
            limit: 10,
            page: page,
        }))
    }

    const handleSetShowModal = (history) => {
        setHistory(history)
        setShowModal(true)
    }

    return (
        <Box backgroundColor={colors.black1} marginTop={10} paddingBottom={10}>
            {
                yourHistory.loading ?
                    <LoadingWhite /> :
                    <>
                        {
                            yourHistory.data.length > 0 ?
                                <>
                                    {yourHistory.data.map((history) =>
                                        <Item
                                            key={history.id}
                                            history={history}
                                            onSetShowModal={handleSetShowModal}
                                        />
                                    )}
                                </> :
                                <NoDataTable />
                        }
                        <Pagination
                            marginTop={10}
                            indexPage={yourHistory.page}
                            total={yourHistory.total}
                            onNext={() => handleGetPrizePoolUserThunk(yourHistory.page + 1)}
                            onBack={() => handleGetPrizePoolUserThunk(yourHistory.page - 1)}
                        />
                    </>
            }
            <ModalConfirmPrizePoolUser
                isShow={isShowModal}
                setShow={setShowModal}
                history={history}
            />
        </Box>
    )
}

export default YourHistory

const Item = ({ history, onSetShowModal }) => {
    const win = history.streak === 'win' ? true : false

    return (
        <Box row padding={10} alignCenter>
            <Box flex={1}>
                <Txt
                    size={15}
                    bold
                    color={win ? colors.green3 : colors.red4}
                >
                    {win ? 'Win Streak 15x' : 'Lose Streak 15x'}
                </Txt>
            </Box>
            <Box flex={1} alignCenter>
                <Txt bold size={15}>
                    ${history.amount}
                </Txt>
            </Box>
            <Box flex={1}>
                {history.type === 1 ?
                    <Box
                        backgroundColor={colors.green3}
                        height={35}
                        width={'80%'}
                        alignCenter
                        justifyCenter
                        radius={10}
                    >
                        <Txt color={colors.white} bold>
                            SUCCESS
                        </Txt>
                    </Box>
                    : history.type === 0 ?
                        <ButtonUser
                            onPress={() => onSetShowModal(history)}
                            text={'Confirm'}
                            height={35}
                            width={'80%'}
                        /> :
                        <Box
                            backgroundColor={colors.yellow}
                            height={35}
                            width={'95%'}
                            alignCenter
                            justifyCenter
                            radius={10}
                        >
                            <Txt color={colors.white} bold>
                                PROCESSING
                            </Txt>
                        </Box>
                }
            </Box>
        </Box>
    )
}