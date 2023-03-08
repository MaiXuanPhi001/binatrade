import { createDrawerNavigator } from '@react-navigation/drawer'
import Trade from '@screen/Trade'
import Profile from '@screen/Profile'
import Setting from '@screen/Setting'
import Wallet from '@screen/Wallet'
import { width } from '@util/responsive'
import routes from '@util/routes'
import DrawerCustom from './DrawerCustom'

const Drawer = createDrawerNavigator()

const AuthNavigation = () => {
    const data = [
        {
            id: 0,
            name: routes.TRADE,
            component: Trade,
        },
        {
            id: 1,
            name: routes.WALLET,
            component: Wallet,
        },
        {
            id: 2,
            name: routes.PROFILE,
            component: Profile,
        },
        {
            id: 3,
            name: routes.SETTING,
            component: Setting,
        },
    ]

    return (
        <Drawer.Navigator
            initialRouteName={routes.CHART}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: width / 2,
                    marginTop: -20
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