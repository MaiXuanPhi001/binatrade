import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { convertDate } from '@method/date'
import { colors } from '@theme/colors'
import { styled } from '@theme/styled'
import { useTranslation } from 'react-i18next'

const OpenOrders = ({ data, COLOR }) => {
    const { t } = useTranslation()

    return (
        <Box>
            {data.map((item) =>
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
    const color = item.side === 'buy' ? colors.green3 : colors.red

    return (
        <Box
            backgroundColor={COLOR.blue2}
            borderLeftWidth={5}
            borderColor={color}
            marginVertical={5}
            padding={10}
            style={styled.shadow}
        >
            <Txt bold color={COLOR.white}>
                {item.symbol}
            </Txt>
            <Txt color={color} size={15} marginVertical={5}>
                {t(item.side.toUpperCase())}
            </Txt>
            <Txt color={COLOR.white}>
                {convertDate(item.created_at)}
            </Txt>
        </Box>
    )
}

export default OpenOrders