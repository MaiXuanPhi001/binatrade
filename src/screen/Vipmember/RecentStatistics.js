import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LastMonth from './LastMonth'
import ThisMonth from './ThisMonth'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]
    const [tab, setTab] = useState('this')

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
                            {t(item.title)}
                        </Txt>
                    </Btn>
                )}
            </Box>

            <Txt size={18} bold marginVertical={30} color={COLOR.white}>
                {t('Recent Statistics')}
            </Txt>
            {tab === 'this' ?
                <ThisMonth /> : <LastMonth />
            }
        </Box>
    )
}

export default RecentStatistics