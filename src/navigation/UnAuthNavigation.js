import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import routes from '../util/routes'
import Login from '@screen/Login'
import SignUp from '@screen/SignUp'
import ForgotPassword from '@screen/ForgotPassword'

const Stack = createNativeStackNavigator()

const UnAuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routes.LOGIN} component={Login} />
            <Stack.Screen name={routes.SIGN_UP} component={SignUp} />
            <Stack.Screen name={routes.FORGOT_PASSWORD} component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default UnAuthNavigation