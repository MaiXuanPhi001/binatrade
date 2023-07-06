import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { navigate } from '@navigation/navigationRef'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Deposit from '@screen/Deposit'
import { styles } from '@screen/Profile/Infomation'
import Transfer from '@screen/Transfer'
import Withdraw from '@screen/Withdraw'
import { theme } from '@theme/index'
import { height } from '@util/responsive'
import routes from '@util/routes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

const Tab = createMaterialTopTabNavigator();

const Main = ({ COLOR }) => {
    const { t } = useTranslation()
    const [tabChoose, setTabchoose] = useState('Deposit')

    const data = [
        {
            title: t('Deposit'),
            choose: 'Deposit' === tabChoose,
            onPress: () => {
                navigate(routes.DEPOSIT)
                setTabchoose('Deposit')
            },
        },
        {
            title: t('Withdraw'),
            choose: 'Withdraw' === tabChoose,
            onPress: () => {
                navigate(routes.WITHDRAW)
                setTabchoose('Withdraw')
            },
        },
        {
            title: t('Transferr'),
            choose: 'Transfer' === tabChoose,
            onPress: () => {
                navigate(routes.TRANSFER)
                setTabchoose('Transfer')
            },
        },
    ]

    return (
        <View
            style={[
                styles.container,
                { marginTop: 20, height: height - 190, borderColor: COLOR.border1 },
            ]}
        >
            <Box row>
                {data.map(item =>
                    <Item
                        key={item.title}
                        item={item}
                        COLOR={COLOR}
                    />
                )}
            </Box>

            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        display: 'none',
                    },
                    swipeEnabled: false,
                }}
            >
                <Tab.Screen name={routes.DEPOSIT} component={Deposit} />
                <Tab.Screen name={routes.WITHDRAW} component={Withdraw} />
                <Tab.Screen name={routes.TRANSFER} component={Transfer} />
            </Tab.Navigator>
        </View>
    )
}

const Item = ({ item, COLOR }) => {
    return (
        <Btn
            onPress={item.onPress}
            // backgroundColor={item.choose ? theme.colors.black2 : '#0b192b'}
            backgroundColor={item.choose ? COLOR.black3 : COLOR.black4}
            margin={5}
            paddingHorizontal={15}
            paddingVertical={10}
            borderWidth={1}
            radius={5}
            borderColor={COLOR.border2}
        >
            <Txt
                bold
                color={item.choose ? theme.colors.blueText : COLOR.white}
            >
                {item.title}
            </Txt>
        </Btn>
    )
}

export default Main