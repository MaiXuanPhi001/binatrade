import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import routes from '@util/routes'
import Hello from '@screen/Hello'
import { navigationRef } from './navigationRef'
import MainNavigation from './MainNavigation'

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

const styles = StyleSheet.create({})