import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { prizePoolUserSelector, profileSelector, typeUserSelector } from '@selector/userSelector'
import { updateBalanceDemo } from '@service/userService'
import userSlice from '@slice/userSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { kFormatter } from '@method/format'

const Header = ({ navigation }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [drop, setDrop] = useState(false)
  const type = useSelector(typeUserSelector)
  const profile = useSelector(profileSelector)
  const prizePool = useSelector(prizePoolUserSelector)

  const handleUpdateBalanceDemo = async () => {
    const res = await updateBalanceDemo()
    res.status && dispatch(await getProfileThunk())
  }

  return (
    <View style={styles.container}>
      <Btn onPress={() => navigation.openDrawer()}>
        <Img
          source={require('@images/burger-bar.png')}
          width={25}
          height={25}
        />
      </Btn>

      <Box row alignCenter>
        {/* Prize pool */}
        <Btn
          row
          alignCenter
          marginRight={10}
        >
          <Img
            source={require('@images/prize.png')}
            marginRight={-20}
            zIndex={1}
            width={50}
            height={50}
          />
          <LinearGradient
            colors={['#160651', '#2e0e87', '#5225d5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1.5 }}
            style={styles.linearGradient}
          >
            <Txt marginLeft={18} bold size={12}>Prize Pool</Txt>
            <Txt marginLeft={18} bold color={'#f7a72e'}>$ {prizePool.length > 0 && kFormatter(prizePool[0]?.value)}</Txt>
          </LinearGradient>
        </Btn>

        {/* Account live */}
        <Box>
          <TouchableOpacity
            onPress={() => setDrop(!drop)}
            style={styles.buttonShow}
          >
            <Box marginRight={15}>
              <Txt size={13}>{t(type === 'live' ? 'Live account' : 'Demo account')}</Txt>
              <Txt bold>$ {numberCommasDot(type === 'live' ? profile.balance : profile.demoBalance)}</Txt>
            </Box>
            <Image
              source={require('@images/wallet/next.png')}
              style={styles.imgDrop}
            />
          </TouchableOpacity>
          {drop &&
            <Animated.View style={[styles.animatedView]}>
              <Txt bold size={16} marginBottom={10}>{t('Change account')}</Txt>
              <TouchableOpacity
                onPress={() => {
                  setDrop(false)
                  dispatch(userSlice.actions.changeType('live'))
                }}
                style={[styles.buttonLiveContainer, { backgroundColor: type === 'live' ? '#354356' : '#011022' }]}
              >
                <View style={styles.circleContainer}>
                  <View style={[styles.circle, { backgroundColor: type === 'live' ? '#0697e7' : '#d1d3d1' }]} />
                  <Box />
                </View>
                <Box>
                  <Txt>{t('Live account')}</Txt>
                  <Txt bold>$ {numberCommasDot(profile.balance)}</Txt>
                </Box>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setDrop(false)
                  dispatch(userSlice.actions.changeType('demo'))
                }}
                style={[styles.buttonDemoContainer, { backgroundColor: type === 'demo' ? '#354356' : '#011022' }]}
              >
                <Box row alignCenter>
                  <View style={styles.circleContainer}>
                    <View style={[styles.circle, { backgroundColor: type === 'demo' ? '#0697e7' : '#d1d3d1' }]} />
                  </View>
                  <View>
                    <Txt>{t('Demo account')}</Txt>
                    <Txt bold>$ {numberCommasDot(profile.demoBalance)}</Txt>
                  </View>
                </Box>
                <Btn onPress={handleUpdateBalanceDemo}>
                  <Img
                    source={require('@images/reload.png')}
                    width={20}
                    height={20}
                  />
                </Btn>
              </TouchableOpacity>
            </Animated.View>
          }
        </Box>

        {/* No tification */}
        {/* <Btn
          alignCenter
          justifyCenter
          paddingLeft={10}
          paddingVertical={10}
        >
          <Box
            backgroundColor={'#ee475e'}
            radius={50}
            padding={2}
            absolute
            zIndex={1}
            top={0}
            right={-10}
          >
            <Txt size={12}>14</Txt>
          </Box>

          <Img
            source={require('@images/bell.png')}
            width={20}
            height={20}
          />
        </Btn> */}
      </Box>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  circleContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonDemoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonLiveContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonShow: {
    flexDirection: 'row',
    backgroundColor: '#354356',
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
  },
  animatedView: {
    backgroundColor: '#02142b',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: 230,
    borderColor: '#313e51',
    position: 'absolute',
    top: 55,
    left: -100,
  },
  imgDrop: {
    width: 20,
    height: 20,
    transform: [
      { rotate: '90deg' }
    ]
  },
  linearGradient: {
    borderWidth: 1,
    borderColor: '#5929e6',
    borderRadius: 10,
    height: 45,
    padding: 5,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    zIndex: 2,
    marginTop: 10,
  }
})