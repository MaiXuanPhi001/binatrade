import { checKYCUserThunk, getListNotificationThunk } from '@asyncThunk/userAsyncThunk'
import { createDrawerNavigator } from '@react-navigation/drawer'
import PrizePool from '@screen/PrizePool'
import Profile from '@screen/Profile'
import Setting from '@screen/Setting'
import Trading from '@screen/Trading'
import Wallet from '@screen/Wallet'
import { width } from '@util/responsive'
import routes from '@util/routes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DrawerCustom from './DrawerCustom'
import Orders from '@screen/Orders'
import Vipmember from '@screen/Vipmember'
import Notifications from '@screen/Notifications'

const Drawer = createDrawerNavigator()

const AuthNavigation = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checKYCUserThunk())
        dispatch(getListNotificationThunk({
            limit: 1000,
            page: 1,
        }))
    })

    const data = [
        {
            id: 0,
            name: routes.TRADING,
            component: Trading,
        },
        {
            id: 1,
            name: routes.ORDERS,
            component: Orders,
        },
        {
            id: 2,
            name: routes.VIPMEMBER,
            component: Vipmember,
        },
        {
            id: 3,
            name: routes.WALLET,
            component: Wallet,
        },
        {
            id: 4,
            name: routes.PROFILE,
            component: Profile,
        },
        {
            id: 5,
            name: routes.SETTING,
            component: Setting,
        },
        {
            id: 6,
            name: routes.PRIZE_POOL,
            component: PrizePool,
        },
        {
            id: 7,
            name: routes.NOTIFICATIONS,
            component: Notifications,
        },
    ]

    return (
        <Drawer.Navigator
            initialRouteName={routes.CHART}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: width / 2,
                    marginTop: -20,
                }
            }}

            drawerContent={props => <DrawerCustom {...props} />}
        >
            {data.map(item =>
                <Drawer.Screen
                    key={item.id}
                    name={item.name}
                    component={item.component}
                />
            )}
        </Drawer.Navigator>
    )
}

export default AuthNavigation