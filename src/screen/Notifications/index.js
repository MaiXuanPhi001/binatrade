import { getListNotificationThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { useNavigation } from '@react-navigation/native'
import Header from '@reuse/Header'
import { notificationsSelector, themeUserSelector } from '@selector/userSelector'
import { clickNotification } from '@service/fundingService'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import routes from '@util/routes'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

// type == 0: Nhận hoa hồng thành viên VIP
// type == 3: Nhận hoa hồng giao dịch
// type == 4: Rút tiền nội bộ thành công
// type == 5: Nạp tiền nội bộ thành công
// type == 6: Nạp tiền
// type == 7: Rút tiền
// type == 8: Thông báo do admin gửi
// type == 9: tắt 2fa thành công
// type == 10: bật 2fa thành công
// type == 11: kyc bị từ chối
// type == 12: kyc được phê duyệt
// type == 13: kyc pending
// type == 14: thông báo nhận prize pool

const Notifications = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const COLOR = colors[useSelector(themeUserSelector)]
  const notifications = useSelector(notificationsSelector)
  const navigation = useNavigation()

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(getListNotificationThunk({
        limit: 1000,
        page: 1,
      }))
    })

    return () => {
      focus
    }
  }, [])

  const colorText = COLOR.white

  const handleClickNotification = async (notifi) => {
    await clickNotification(notifi.id)
    let screen = routes.TRADING
    if (notifi.type === 3 || notifi.type === 8) screen = routes.TRADING
    if (notifi.type === 4 || notifi.type === 5 || notifi.type === 6 || notifi.type === 6) screen = routes.WALLET
    if (notifi.type === 9 || notifi.type === 10 || notifi.type === 11 || notifi.type === 12 || notifi.type === 13) screen = routes.PROFILE
    if (notifi.type === 14) screen = routes.PRIZE_POOL

    navigate(screen)
    dispatch(userSlice.actions.setScreenChoose(screen))
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleClickNotification(item)}>
        <Box
          row
          paddingVertical={10}
          borderBottomWidth={1}
          borderColor={COLOR.border1}
        >
          <Img
            source={require('@images/bell.png')}
            width={20}
            height={20}
            marginRight={10}
            tintColor={(item.type === 3 || item.type === 14) ? colors.yellow : colorText}
          />
          <Box paddingRight={20} flex={1}>
            <Box row justifySpaceBetween alignStart>
              <Txt
                size={16}
                bold
                color={(item.type === 3 || item.type === 14) ? colors.yellow : colorText}
              >
                {t(item.title)}
              </Txt>
              <Box
                width={10}
                height={10}
                backgroundColor={item.watched === 0 ? colors.sky : COLOR.border1}
                radius={50}
              />
            </Box>
            <Txt marginVertical={10} size={15} color={colorText}>
              {item.detail}
            </Txt>
            <Txt color={colorText}>
              {item.created_at}
            </Txt>
          </Box>
        </Box>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLOR.backgroundProfile,
        flex: 1,
      }}
    >
      <Header navigation={navigation} />
      <FlatList
        data={notifications.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10, marginTop: 20 }}
      />
    </SafeAreaView>
  )
}

export default Notifications