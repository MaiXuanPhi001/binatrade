import React, { useEffect } from 'react'
import routes from '@util/routes'
import Img from '@commom/Img'
import Box from '@commom/Box'
import AsyncStorage from '@react-native-async-storage/async-storage'
import contants from '@util/contants'
import { useDispatch } from 'react-redux'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import { useTranslation } from 'react-i18next'
import { theme } from '@theme/index'
import LoadingWhite from '@reuse/LoadingWhite'
import userSlice from '@slice/userSlice'

const Hello = ({ navigation }) => {
    const dispatch = useDispatch()

    const { i18n } = useTranslation()

    useEffect(() => {
        const timer = setTimeout(async () => {
            const lng = await AsyncStorage.getItem(contants.LANGUAGE) || 'en'
            i18n.changeLanguage(lng)

            const sound = await AsyncStorage.getItem(contants.SOUND) || true
            dispatch(userSlice.actions.setSound(JSON.parse(sound)))

            const token = await AsyncStorage.getItem(contants.TOKEN) || null
            if (token) {
                await dispatch(getProfileThunk())
            }
            navigation.replace(routes.MAIN_NAVIGATION)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <Box
            flex={1}
            justifyCenter
            alignCenter
            backgroundColor={theme.colors.background}
        >
            <Img
                width={'80%'}
                resizeMode={'contain'}
                source={require('@images/logo_text.png')}
            />
            <LoadingWhite />
        </Box>
    )
}

export default Hello