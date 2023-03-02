import React from 'react'
import { useSelector } from 'react-redux'
import AuthNavigation from './AuthNavigation'
// import TabNavigator from './TabNavigator'
// import StackNavigator from './StackNavigator'
import { isLoginUserSelector } from '@selector/userSelector'
const MainNavigation = () => {
    const isLogin = useSelector(isLoginUserSelector)

    return (
        <>
            {isLogin ? <></> : <AuthNavigation />}
        </>
    )
}

export default MainNavigation