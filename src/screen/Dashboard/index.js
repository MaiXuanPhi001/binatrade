import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { profileSelector, themeUserSelector, typeUserSelector } from '@selector/userSelector'
import { dayStatisticsOrder } from '@service/fundingService'
import { colors } from '@theme/colors'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Diagram from './Diagram'
import Profit from './Profit'
import History from './History'
import { useTranslation } from 'react-i18next'

const Dashboard = ({ navigation }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]
    const typeUser = useSelector(typeUserSelector)
    const profile = useSelector(profileSelector)
    const [data, setData] = useState(null)

    useEffect(() => {
        handleDayStatisticsOrder()
    }, [])

    const handleDayStatisticsOrder = async () => {
        const res = await dayStatisticsOrder({
            type: typeUser,
            userid: profile.id,
        })
        if (res.status) {
            setData(res.data)
        }
    }

    return (
        <KeyBoardSafe
            bg={COLOR.backgroundProfile}
            paddingBottom={0}
        >
            <Header navigation={navigation} />
            <Box paddingHorizontal={10}>
                <Txt bold size={18} marginVertical={20} color={COLOR.white}>
                    {t('BO Statictics')}
                </Txt>
                {data &&
                    <>
                        <Diagram {...{ data }} />
                        <Profit {...{ data }} />
                    </>
                }
                <History />
            </Box>
        </KeyBoardSafe>
    )
}

export default Dashboard