import { dayHistoryOrderThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import Pagination from '@reuse/Pagination'
import { typeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { styled } from '@theme/styled'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const RESULT = {
    pending: {
        text: 'PENDING',
        color: colors.yellow3,
        profit: 0,
    },
    draw: {
        text: 'DRAW',
        color: colors.grayBlue,
        profit: 0,
    },
    lose: {
        text: 'LOSE',
        color: colors.red,
        profit: 0,
    },
    win: {
        text: 'WIN',
        color: colors.green3,
        profit: 0,
    },
}

const CloseOrders = ({ dayHistoryOrder, COLOR }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const type = useSelector(typeUserSelector)

    const handleDayHistoryOrderThunk = async (page) => {
        await dispatch(dayHistoryOrderThunk({
            limit: 10,
            page: page,
            type: type,
        }))
    }
    console.log(dayHistoryOrder.total)
    return (
        <Box>
            <Pagination
                marginTop={-15}
                indexPage={dayHistoryOrder.page}
                total={dayHistoryOrder.total}
                onNext={() => handleDayHistoryOrderThunk(dayHistoryOrder.page + 1)}
                onBack={() => handleDayHistoryOrderThunk(dayHistoryOrder.page - 1)}
            />
            {dayHistoryOrder.loading ?
                <LoadingWhite /> :
                <Box marginTop={10}>
                    {dayHistoryOrder.data.map((item) =>
                        <Item
                            key={item.id}
                            item={item}
                            COLOR={COLOR}
                            t={t}
                        />
                    )}
                </Box>
            }
        </Box>
    )
}

const Item = ({ item, COLOR, t }) => {
    const result =
        item.status === 'PENDING' ? RESULT.pending :
            item.resultProfit === -1 ? { ...RESULT.draw, profit: 0 } :
                item.resultProfit === 0 ? { ...RESULT.lose, profit: -(item.amount) } :
                    { ...RESULT.win, profit: item.amount * (1 + item.configProfit) }

    const color = item.side === 'buy' ? colors.green3 : colors.red

    return (
        <Box
            backgroundColor={COLOR.blue2}
            borderLeftWidth={5}
            borderColor={color}
            marginVertical={5}
            row
            justifySpaceBetween
            padding={10}
            style={styled.shadow}
        >
            <Box>
                <Txt bold color={COLOR.white}>
                    {item.symbol}
                </Txt>
                <Txt color={color} size={15} marginVertical={5}>
                    {t(item.side.toUpperCase())}
                </Txt>
                <Box
                    backgroundColor={result.color}
                    alignSelf={'flex-start'}
                    padding={3}
                    radius={5}
                    marginVertical={5}
                >
                    <Txt bold size={13}>{t(result.text)}</Txt>
                </Box>
                <Txt color={COLOR.white} marginTop={5}>
                    {item.created_at}
                </Txt>
            </Box>
            <Box justifyCenter alignEnd>
                <Txt marginBottom={5} color={COLOR.white}>${item.amount}</Txt>
                <Txt color={result.color} bold>
                    {result.profit}
                </Txt>
            </Box>
        </Box>
    )
}

export default CloseOrders