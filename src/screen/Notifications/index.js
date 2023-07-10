import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import Header from '@reuse/Header'
import { notificationsSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import i18next from 'i18next'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

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

const Notifications = ({ navigation }) => {
  const { t } = useTranslation()
  const COLOR = colors[useSelector(themeUserSelector)]
  const notifications = useSelector(notificationsSelector)

  // useEffect(() => {
  //   if (i18next.language === 'vn') {
  //     notifications.data.map((item, index) => {
        
  //     })
  //   }
  // }, [])

  for (let i = 0 ; i < notifications.data.length ; i++) {
    if (notifications.data[i].type == 6) {
      console.log(notifications.data[i])
      console.log('index: ', i)
      break
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => console.log({...item, index})}>
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
          />
          <Box paddingRight={20}>
            <Box row alignCenter justifySpaceBetween>
              <Txt size={16} bold>
                {t(item.title)}
              </Txt>
              <Box width={10} height={10} backgroundColor={colors.sky} radius={50} />
            </Box>
            <Txt marginVertical={10} size={15}>
              {item.detail}
            </Txt>
            <Txt>
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
      }}
    >
      <Header navigation={navigation} />
      <FlatList
        data={notifications.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
      />
    </SafeAreaView>
  )
}

export default Notifications