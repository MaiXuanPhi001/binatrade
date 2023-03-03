import React, { useState } from 'react'
import { theme } from '@theme/index'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import Img from '@commom/Img'
import { navigate } from './navigationRef'
import routes from '@util/routes'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userSlice from '@slice/userSlice'
import contants from '@util/contants'
import { useDispatch } from 'react-redux'

const DrawerCustom = (props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [screenChoose, setScreenChoose] = useState(routes.CHART)

    const logOut = async () => {
        await AsyncStorage.removeItem(contants.TOKEN)
        dispatch(userSlice.actions.signOut())
    }

    const data = [
        {
            id: 0,
            title: t('Trade'),
            image: require('@images/drawer/rocket1.png'),
            choose: routes.CHART === screenChoose,
            onPress: () => {
                navigate(routes.CHART)
                setScreenChoose(routes.CHART)
            },
        },
        {
            id: 1,
            title: t('Wallet'),
            image: require('@images/drawer/ewallet.png'),
            choose: routes.WALLET === screenChoose,
            onPress: () => {
                navigate(routes.WALLET)
                setScreenChoose(routes.WALLET)
            },
        },
        {
            id: 2,
            title: t('Profile'),
            image: require('@images/drawer/user.png'),
            choose: routes.PROFILE === screenChoose,
            onPress: () => {
                navigate(routes.PROFILE)
                setScreenChoose(routes.PROFILE)
            },
        },
        {
            id: 3,
            title: t('Setting'),
            image: require('@images/drawer/settings.png'),
            choose: routes.SETTING === screenChoose,
            onPress: () => {
                navigate(routes.SETTING)
                setScreenChoose(routes.SETTING)
            },
        },
    ]

    return (
        <Box
            backgroundColor={theme.colors.background}
            flex={1}
        >
            <DrawerContentScrollView {...props}
                style={{
                    padding: 10
                }}
            >
                <Box height={30} />
                {data.map(drawer =>
                    <DrawerItem
                        key={drawer.id}
                        drawer={drawer}
                    />
                )}
            </DrawerContentScrollView>
            <Box
                marginBottom={20}
                padding={10}
                borderTopWidth={0.5}
                borderColor={theme.colors.gray4}
            >
                <DrawerItem
                    drawer={{
                        id: 3084342343223423,
                        title: t('Log out'),
                        image: require('@images/option/log-out.png'),
                        onPress: logOut,
                    }}
                />
            </Box>
        </Box>
    )
}

const DrawerItem = ({ drawer }) => {
    return (
        <Btn
            onPress={drawer.onPress}
            row
            alignCenter
            justifyStart
            marginVertical={15}
            paddingVertical={5}
            radius={5}
            backgroundColor={drawer.choose ? theme.colors.drawerChoose : theme.colors.background}
        >
            <Img
                source={drawer.image}
                width={30}
                height={30}
                marginRight={10}
                marginLeft={5}
            />
            <Txt size={16} bold>{drawer.title}</Txt>
        </Btn>
    )
}

export default DrawerCustom