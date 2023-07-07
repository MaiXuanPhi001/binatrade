import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { historyCommissionTradingSelelctor } from '@selector/fundingSelector'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import HeaderTableTradingPayoutDetails from './HeaderTableTradingPayoutDetails'
import { getHistoryCommissionToTimeThunk } from '@asyncThunk/fundingAsyncThunk'
import Pagination from '@reuse/Pagination'

const TradingPayoutDetails = () => {
    const dispath = useDispatch()
    const COLOR = colors[useSelector(themeUserSelector)]
    const historyCommission = useSelector(historyCommissionTradingSelelctor)
    const { t } = useTranslation()

    const handleGetHistoryCommissionToTime = async (page) => {
        await dispath(getHistoryCommissionToTimeThunk({
            limit: 10,
            page: page,
            timeStart: historyCommission.timeStart,
            timeEnd: historyCommission.timeEnd,
        }))
    }

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
        >
            <Txt bold size={18}>
                Trading payout details
            </Txt>

            <Pagination
                marginTop={10}
                indexPage={historyCommission.page}
                total={historyCommission.total}
                onNext={() => handleGetHistoryCommissionToTime(historyCommission.page + 1)}
                onBack={() => handleGetHistoryCommissionToTime(historyCommission.page - 1)}
            />

            <Scroll horizontal>
                <Box>
                    <HeaderTableTradingPayoutDetails />
                    {historyCommission.data.map((item) =>
                        <Item
                            key={item.id}
                            history={item}
                            COLOR={COLOR}
                            t={t}
                        />
                    )}
                </Box>
            </Scroll>
        </Box>
    )
}

const Item = ({ history, t, COLOR }) => {
    const sizeText = 13

    return (
        <Box
            row
            alignCenter
            height={45}
            borderBottomWidth={0.5}
            borderColor={COLOR.gray}
        >
            <Box
                paddingHorizontal={5}
                width={130}
            >
                <Txt size={sizeText} color={COLOR.white}>
                    {history.userName}
                </Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={130}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    $ {history?.amount}
                </Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={100}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    $ {history?.amountReceive}
                </Txt>
            </Box>

            <Box
                alignCenter
                width={200}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    {history?.created_at}
                </Txt>
            </Box>
        </Box>
    )
}

export default TradingPayoutDetails