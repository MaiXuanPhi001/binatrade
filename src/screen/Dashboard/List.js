import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { RESULT } from '@screen/Orders/CloseOrders'
import { colors } from '@theme/colors'
import { styled } from '@theme/styled'
import { useTranslation } from 'react-i18next'

const List = ({ dayWeekHistory, COLOR }) => {
    const { t } = useTranslation()

    return (
        <Box marginTop={10}>
            {dayWeekHistory.data.map((item) =>
                <Item
                    key={item.id}
                    item={item}
                    COLOR={COLOR}
                    t={t}
                />
            )}
        </Box>
    )
}

const Item = ({ item, COLOR, t }) => {
    const result =
        item.status === 'PENDING' ? RESULT.pending :
            item.resultProfit === -1 ? { ...RESULT.draw, profit: 0 } :
                item.resultProfit === 0 ? { ...RESULT.lose, profit: -(item.amount) } :
                    { ...RESULT.win, profit: item.amount * (1 + item.configProfit) }

    return (
        <Box
            backgroundColor={COLOR.blue2}
            marginVertical={5}
            padding={10}
            row
            justifySpaceBetween
            alignCenter
            style={styled.shadow}
        >
            <Box>
                <Txt bold size={16} color={COLOR.white}>
                    {item.symbol}
                </Txt>
                <Txt
                    size={15}
                    bold
                    color={item.side === 'buy' ? colors.green2 : colors.red2}
                    marginVertical={7}
                >
                    {t(item.side.toUpperCase())}
                    <Txt color={COLOR.white}>  ${item.amount}</Txt>
                </Txt>
                <Txt color={COLOR.white}>{item.created_at}</Txt>
            </Box>
            <Box backgroundColor={result.color} padding={3} radius={5}>
                <Txt bold>{t(result.text)}</Txt>
            </Box>
            <Txt color={result.color}>
                $ {result.profit}
            </Txt>
        </Box>
    )
}

export default List