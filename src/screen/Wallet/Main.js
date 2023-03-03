import { View } from 'react-native'
import React from 'react'
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

    const data = [
        {
            title: t('Deposit'),
            onPress: () => navigate(routes.DEPOSIT),
        },
        {
            title: t('Withdraw'),
            onPress: () => navigate(routes.WITHDRAW),
        },
        {
            title: t('Transfer'),
            onPress: () => navigate(routes.TRANSFER),
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
            backgroundColor={theme.colors.black2}
            margin={5}
            paddingHorizontal={15}
            paddingVertical={10}
            borderWidth={1}
            radius={5}
            borderColor={theme.colors.gray4}
        >
            <Txt bold>{item.title}</Txt>
        </Btn>
    )
}

export default Main