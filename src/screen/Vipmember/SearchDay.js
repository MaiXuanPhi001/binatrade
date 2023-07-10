import { getHistoryCommissionToTimeThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { dateYMD } from '@method/date'
import ButtonLiner from '@reuse/ButtonLiner'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useState } from 'react'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ModalCalendar from './ModalCalendar'
import { historyCommissionTradingSelelctor } from '@selector/fundingSelector'
import fundingSlice from '@slice/fundingSlice'
import { useTranslation } from 'react-i18next'

const SIZE_TEXT = 15

const SearchDay = () => {
    const dispath = useDispatch()
    const { t } = useTranslation()
    const historyCommission = useSelector(historyCommissionTradingSelelctor)
    const COLOR = colors[useSelector(themeUserSelector)]
    const [type, setType] = useState('Trading commission')
    const [drop, setDrop] = useState(false)
    const [typeDate, setTypeDate] = useState('start')
    const [isShowModalCalendar, setShowModalCalendar] = useState(false)

    const handleSetDate = (dateObject) => {
        if (typeDate === 'start') {
            dispath(fundingSlice.actions.setHistoryCommission({
                ...historyCommission,
                timeStart: dateObject.timestamp
            }))
        } else {
            dispath(fundingSlice.actions.setHistoryCommission({
                ...historyCommission,
                timeEnd: dateObject.timestamp
            }))
        }
    }

    const handleGetHistoryCommissionToTime = async () => {
        if (historyCommission.timeStart === '' || historyCommission.timeEnd === '') return
        const { payload } = await dispath(
            getHistoryCommissionToTimeThunk({
                limit: 10,
                page: 1,
                timeStart: historyCommission.timeStart,
                timeEnd: historyCommission.timeEnd,
            })
        )
        if (!payload.status) {
            Alert.alert(payload.message)
        }
    }

    return (
        <Box>
            <Txt size={18} bold color={COLOR.white}>
                {t('Commission')}
            </Txt>

            <Box marginTop={20} alignSelf={'flex-start'}>
                <Txt size={SIZE_TEXT} color={COLOR.white}>
                    {t('Commission type')}
                </Txt>
                <Box>
                    <Btn
                        onPress={() => setDrop(!drop)}
                        row
                        borderWidth={1}
                        borderColor={COLOR.border1}
                        padding={5}
                        marginTop={10}
                        radius={5}
                        alignSelf={'flex-start'}
                    >
                        <Txt size={SIZE_TEXT} color={COLOR.white}>
                            {t(type)}
                        </Txt>
                        <Img
                            source={require('@images/vip/down.png')}
                            tintColor={colors.white}
                            width={20}
                            height={20}
                            marginLeft={10}
                        />
                    </Btn>
                    {drop &&
                        <Box backgroundColor={colors.black2} marginTop={5} radius={5}>
                            <Btn
                                onPress={() => {
                                    setType('Trading commission')
                                    setDrop(false)
                                }}
                                alignCenter={false}
                                padding={10}
                            >
                                <Txt>{t('Trading commission')}</Txt>
                            </Btn>
                            <Btn
                                onPress={() => {
                                    setType('VIP commission')
                                    setDrop(false)
                                }}
                                alignCenter={false}
                                padding={10}
                            >
                                <Txt>{t('VIP commission')}</Txt>
                            </Btn>
                        </Box>
                    }
                </Box>
            </Box>

            <Box marginTop={20} alignSelf={'flex-start'}>
                <Txt size={SIZE_TEXT} color={COLOR.white}>
                    {t('Time')}
                </Txt>
                <Box row>
                    <Btn
                        onPress={() => {
                            setTypeDate('start')
                            setShowModalCalendar(true)
                        }}
                        row
                        borderWidth={1}
                        borderColor={COLOR.border1}
                        padding={5}
                        marginTop={10}
                        radius={5}
                        marginRight={10}
                        alignSelf={'flex-start'}
                    >
                        <Txt size={SIZE_TEXT} color={COLOR.white}>
                            {historyCommission.timeStart ? dateYMD(historyCommission.timeStart) : t('Start date')}
                        </Txt>
                        <Img
                            source={require('@images/vip/calendar.png')}
                            tintColor={colors.white}
                            width={20}
                            height={20}
                            marginLeft={10}
                        />
                    </Btn>

                    <Btn
                        onPress={() => {
                            setTypeDate('end')
                            setShowModalCalendar(true)
                        }}
                        row
                        borderWidth={1}
                        borderColor={COLOR.border1}
                        padding={5}
                        marginTop={10}
                        radius={5}
                        alignSelf={'flex-start'}
                    >
                        <Txt size={SIZE_TEXT} color={COLOR.white}>
                            {historyCommission.timeEnd ? dateYMD(historyCommission.timeEnd) : t('End date')}
                        </Txt>
                        <Img
                            source={require('@images/vip/calendar.png')}
                            tintColor={colors.white}
                            width={20}
                            height={20}
                            marginLeft={10}
                        />
                    </Btn>
                </Box>
            </Box>

            <ButtonLiner
                onPress={handleGetHistoryCommissionToTime}
                text={t('Search')}
                width={100}
                height={35}
                marginTop={10}
            />

            <Txt marginTop={20} color={COLOR.white}>
                <Txt color={colors.sky}>{t('Note')}:</Txt> {t('Each new day, you will receive commissions from all the trading volume of your peers yesterday.')}
            </Txt>

            <ModalCalendar
                show={isShowModalCalendar}
                setShow={setShowModalCalendar}
                onSetDate={handleSetDate}
            />
        </Box>
    )
}

export default SearchDay