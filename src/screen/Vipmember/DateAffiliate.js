import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { parentListTradingSelector } from '@selector/fundingSelector'
import { themeUserSelector } from '@selector/userSelector'
import fundingSlice from '@slice/fundingSlice'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { useDispatch, useSelector } from 'react-redux'

const times = [
    { title: 'Yesterday', value: 'beforeTotalOrder', value2: 'beforeCommission' },
    { title: 'Last 7 days', value: 'totalOrder7Day', value2: 'commissionBalance7Day' },
    { title: 'Last 30 days', value: 'totalOrder30Day', value2: 'commissionBalance30Day' },
    { title: 'All time', value: 'totalOrder', value2: 'totalCommission' },
]

const DateAffiliate = () => {
    const dispath = useDispatch()
    const COLOR = colors[useSelector(themeUserSelector)]
    const parentList = useSelector(parentListTradingSelector)

    const handleSetParenList = async (item) => {
        dispath(fundingSlice.actions.setParentList({
            ...parentList,
            fieldTotal: item.value,
            fieldCommission: item.value2,
        }))
    }

    return (
        <Box
            alignCenter
            marginTop={20}
        >
            <Box
                row
                borderWidth={1}
                borderColor={COLOR.border1}
                radius={7}
            >
                {times.map((item, index) =>
                    <Btn
                        onPress={() => handleSetParenList(item)}
                        padding={5}
                        key={item.title}
                        flex={1}
                        borderRightWidth={(index < times.length - 2) ? 1 : 0}
                        borderColor={COLOR.border1}
                        backgroundColor={item.value === parentList.fieldTotal && colors.sky}
                    >
                        <Txt>{item.title}</Txt>
                    </Btn>
                )}
            </Box>
        </Box>
    )
}

export default DateAffiliate