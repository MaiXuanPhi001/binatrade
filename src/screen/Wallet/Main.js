import { View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@screen/Profile/Infomation'
import Box from '@commom/Box'
import { useTranslation } from 'react-i18next'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import routes from '@util/routes'
import Deposit from '@screen/Deposit'
import Withdraw from '@screen/Withdraw'
import { navigate } from '@navigation/navigationRef'
import Transfer from '@screen/Transfer'
import { height } from '@util/responsive'

const Tab = createMaterialTopTabNavigator();

const Main = () => {
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
        <View style={[styles.container, { marginTop: 20, height: height -190 }]}>
            <Box row>
                {data.map(item =>
                    <Item
                        key={item.title}
                        item={item}
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

const Item = ({ item }) => {
    return (
        <Btn
            onPress={item.onPress}
            backgroundColor={item.choose ? theme.colors.black2 : '#0b192b'}
            margin={5}
            paddingHorizontal={15}
            paddingVertical={10}
            borderWidth={1}
            radius={5}
            borderColor={theme.colors.gray4}
        >
            <Txt bold color={item.choose ? theme.colors.blueText : 'white'}>{item.title}</Txt>
        </Btn>
    )
}

export default Main