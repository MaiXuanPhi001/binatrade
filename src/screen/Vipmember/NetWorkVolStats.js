import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { dateDMY } from '@method/date'
import { themeUserSelector } from '@selector/userSelector'
import { getChartStatisticsUser } from '@service/fundingService'
import { colors } from '@theme/colors'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HeaderTableVolStats from './HeaderTableVolStats'

const NetWorkVolStats = () => {
    const COLOR = colors[useSelector(themeUserSelector)]
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const { t } = useTranslation()

    useEffect(() => {
        handleGetChartStatisticsUser()
    }, [])

    const handleGetChartStatisticsUser = async () => {
        let dateNow = new Date()
        let start = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getTime()
        let end = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getTime()

        const res = await getChartStatisticsUser({
            start,
            end,
        })

        if (res.status) {
            const totalVolume = res.data.reduce((preVal, currenVal) => {
                return preVal + currenVal.totalVolume
            }, 0)
            setData(res.data)
            setTotal(totalVolume)
        }
    }

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
        >
            <Txt size={18} bold>Network Vol Stats</Txt>
            <HeaderTableVolStats />
            {data.map((item) =>
                <Item
                    key={item.id}
                    item={item}
                    COLOR={COLOR}
                    t={t}
                />
            )}

            <Box row backgroundColor={colors.sky} padding={10}>
                <Box flex={1}>
                    <Txt bold size={16}>{t('Total')}</Txt>
                </Box>

                <Box flex={1}>
                    <Txt bold size={16}>$ {total}</Txt>
                </Box>
            </Box>
        </Box>
    )
}

const Item = ({ COLOR, item, t }) => {
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
                flex={1}
            >
                <Txt size={sizeText} color={COLOR.white}>
                    {dateDMY(item.created_at)}
                </Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                flex={1}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    {item?.totalVolume}
                </Txt>
            </Box>
        </Box>
    )
}

export default NetWorkVolStats