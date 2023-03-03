import React from 'react'
import { useSelector } from 'react-redux'
import UnAuthNavigation from './UnAuthNavigation'
// import TabNavigator from './TabNavigator'
// import StackNavigator from './StackNavigator'
import { isLoginUserSelector } from '@selector/userSelector'
import AuthNavigation from './AuthNavigation'
const MainNavigation = () => {
    const isLogin = useSelector(isLoginUserSelector)

    return (
        <>
            {isLogin ? <AuthNavigation /> : <UnAuthNavigation />}
        </>
    )
}

export default MainNavigation