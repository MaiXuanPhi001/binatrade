import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ThisMonth from './ThisMonth'
import { getChartStatisticsUser } from '@service/fundingService'

const tabs = [
    {
        title: 'This month',
        value: 'this',
    },
    {
        title: 'Last month',
        value: 'last',
    },
]

const RecentStatistics = () => {
    const COLOR = colors[useSelector(themeUserSelector)]
    const [tab, setTab] = useState('this')
    const [data, setData] = useState([])

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
            setData(res.data)
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
            <Box row>
                {tabs.map(item =>
                    <Btn
                        key={item.title}
                        onPress={() => setTab(item.value)}
                        backgroundColor={item.value === tab ? COLOR.black3 : COLOR.black4}
                        margin={5}
                        paddingHorizontal={15}
                        paddingVertical={10}
                        borderWidth={1}
                        radius={5}
                        alignSelf={'flex-start'}
                        borderColor={COLOR.border2}
                    >
                        <Txt
                            bold
                            color={item.value === tab ? theme.colors.blueText : COLOR.white}
                        >
                            {item.title}
                        </Txt>
                    </Btn>
                )}
            </Box>

            <Txt size={18} bold marginVertical={30}>
                Recent Statistics
            </Txt>

            <ThisMonth />
        </Box>
    )
}

export default RecentStatistics