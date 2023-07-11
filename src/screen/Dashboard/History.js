import { dayHistoryOrderThunk, weekHistoryOrderThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import Pagination from '@reuse/Pagination'
import { dayWeekHistoryOrderTradingSelector } from '@selector/fundingSelector'
import { themeUserSelector, typeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from './List'
import { useTranslation } from 'react-i18next'

const dates = ['Today', 'This week']

const History = () => {
    const dispatch = useDispatch()
    const COLOR = colors[useSelector(themeUserSelector)]
    const dayWeekHistory = useSelector(dayWeekHistoryOrderTradingSelector)
    const typeUser = useSelector(typeUserSelector)
    const [down, setDown] = useState(false)
    const [day, setDay] = useState('Today')
    const { t } = useTranslation()

    useEffect(() => {
        handleGetHistoryOrder(1, 'Today')
    }, [])

    const handleSetDay = async (time) => {
        setDay(time)
        setDown(false)
        handleGetHistoryOrder(1, time)
    }

    const handleGetHistoryOrder = (page, time) => {
        if (time === 'Today') {
            dispatch(dayHistoryOrderThunk({
                limit: 10,
                page: page,
                type: typeUser,
            }))
        } else {
            dispatch(weekHistoryOrderThunk({
                limit: 10,
                page: page,
                type: typeUser,
            }))
        }
    }

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
        >
            <Txt size={18} bold color={COLOR.white}>
                {t('Trade history')}
            </Txt>
            <Box alignEnd marginBottom={10}>
                <Box width={150} marginTop={20}>
                    <Btn
                        onPress={() => setDown(!down)}
                        borderWidth={1}
                        borderColor={COLOR.border1}
                        row
                        justifySpaceBetween
                        height={40}
                        paddingHorizontal={10}
                        width={'100%'}
                        radius={7}
                    >
                        <Txt color={COLOR.white}>{t(day)}</Txt>
                        <Img
                            source={require('@images/vip/down.png')}
                            tintColor={COLOR.white}
                            width={15}
                            height={15}
                        />
                    </Btn>
                    {down &&
                        <Box
                            backgroundColor={colors.brown}
                            width={150}
                        >
                            {dates.map((item) =>
                                <Item
                                    key={item}
                                    item={item}
                                    onSetDay={handleSetDay}
                                    t={t}
                                />
                            )}
                        </Box>
                    }
                </Box>
            </Box>

            <Pagination
                marginTop={10}
                indexPage={dayWeekHistory.page}
                total={dayWeekHistory.total}
                onNext={() => handleGetHistoryOrder(dayWeekHistory.page + 1, day)}
                onBack={() => handleGetHistoryOrder(dayWeekHistory.page - 1, day)}
            />

            <List {...{ dayWeekHistory, COLOR }} />
        </Box>
    )
}


const Item = ({ item, onSetDay, t }) => {
    return (
        <Btn
            onPress={() => onSetDay(item)}
            padding={10}
            alignCenter={false}
        >
            <Txt>
                {t(item)}
            </Txt>
        </Btn>
    )
}

export default History