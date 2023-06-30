import React, { useEffect, useState } from 'react'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Header from '@reuse/Header'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import Language from '@reuse/Language'
import Img from '@commom/Img'
import { Switch } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import contants from '@util/contants'
import { useDispatch, useSelector } from 'react-redux'
import { soundUserSelector } from '@selector/userSelector'
import userSlice from '@slice/userSlice'
import ChangeTheme from './ChangeTheme'

const Setting = ({ navigation }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const sound = useSelector(soundUserSelector)

  useEffect(() => {
    handleCheckSound()
  }, [])

  const handleCheckSound = async () => {
    const sound = await AsyncStorage.getItem(contants.SOUND) || true
    dispatch(userSlice.actions.setSound(JSON.parse(sound)))
  }

  const handleChangeSound = async (bool) => {
    await AsyncStorage.setItem(contants.SOUND, JSON.stringify(bool))
    dispatch(userSlice.actions.setSound(bool))
  }

  return (
    <KeyBoardSafe paddingBottom={0}>
      <Header navigation={navigation} />
      <Box padding={10} zIndex={1}>
        <Txt size={20} bold>{t('Setting')}</Txt>
        <Box
          row
          alignCenter
          justifySpaceBetween
          marginVertical={10}
        >
          <Box row alignCenter>
            <Img
              source={require('@images/profile/internet.png')}
              width={25}
              height={25}
              marginRight={5}
            />
            <Txt bold size={16}>{t('Language')}</Txt>
          </Box>

          <Language marginRight={0} />
        </Box>
      </Box>

      <Box
        row
        alignCenter
        justifyCenter
        justifySpaceBetween
        padding={10}
      >
        <Box
          row
          alignCenter
        >
          <Img
            source={require('@images/profile/sound.png')}
            width={25}
            height={25}
            marginRight={10}
          />
          <Txt bold size={16}>{t('Sound')}</Txt>
        </Box>

        <Switch
          trackColor={{ false: "#FF0000", true: "#3EEB45" }}
          thumbColor={sound ? "#E8F5E9" : "#E8F5E9"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => handleChangeSound(value)}
          value={sound}
        />
      </Box>

      <ChangeTheme t={t}/>
    </KeyBoardSafe>
  )
}

export default Setting