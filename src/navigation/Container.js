import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Hello from '@screen/Hello'
import routes from '@util/routes'
import MainNavigation from './MainNavigation'
import { navigationRef } from './navigationRef'

const Stack = createNativeStackNavigator()

const Container = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={routes.HELLO} component={Hello} />
                <Stack.Screen name={routes.MAIN_NAVIGATION} component={MainNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Container

