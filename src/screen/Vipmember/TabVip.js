import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

const TabVip = ({ tab, setTab }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]

    const tabs = [
        {
            title: 'General',
            value: 'general',
        },
        {
            title: 'Commission',
            value: 'commission',
        },
        {
            title: 'Network Management',
            value: 'network',
        },
    ]

    return (
        <ScrollView horizontal
            contentContainerStyle={{
                alignSelf: 'flex-start',
                marginTop: 20,
            }}
        >
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
        </ScrollView>
    )
}

export default TabVip