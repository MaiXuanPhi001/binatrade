import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { screenChooseUserSelector } from '@selector/userSelector'
import userSlice from '@slice/userSlice'
import { theme } from '@theme/index'
import contants from '@util/contants'
import routes from '@util/routes'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from './navigationRef'

const DrawerCustom = (props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const screenChoose = useSelector(screenChooseUserSelector)

    const logOut = async () => {
        navigate(routes.TRADE)
        dispatch(userSlice.actions.setScreenChoose(routes.TRADE))
        await AsyncStorage.removeItem(contants.TOKEN)
        dispatch(userSlice.actions.signOut())
    }

    const data = [
        {
            id: 0,
            title: t('Trade'),
            image: require('@images/drawer/rocket1.png'),
            choose: routes.TRADE === screenChoose,
            onPress: () => {
                navigate(routes.TRADE)
                dispatch(userSlice.actions.setScreenChoose(routes.TRADE))
            },
        },
        {
            id: 1,
            title: t('Wallet'),
            image: require('@images/drawer/ewallet.png'),
            choose: routes.WALLET === screenChoose,
            onPress: () => {
                navigate(routes.WALLET)
                dispatch(userSlice.actions.setScreenChoose(routes.WALLET))
            },
        },
        {
            id: 2,
            title: t('Profile'),
            image: require('@images/drawer/user.png'),
            choose: routes.PROFILE === screenChoose,
            onPress: () => {
                navigate(routes.PROFILE)
                dispatch(userSlice.actions.setScreenChoose(routes.PROFILE))
            },
        },
        {
            id: 3,
            title: t('Setting'),
            image: require('@images/drawer/settings.png'),
            choose: routes.SETTING === screenChoose,
            onPress: () => {
                navigate(routes.SETTING)
                dispatch(userSlice.actions.setScreenChoose(routes.SETTING))
            },
        },
    ]

    return (
        <Box
            backgroundColor={theme.colors.drawer}
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
            backgroundColor={drawer.choose ? theme.colors.drawerChoose : theme.colors.drawer}
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