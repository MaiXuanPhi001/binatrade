import React, { useState } from 'react'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import LinearGradient from 'react-native-linear-gradient'
import { Image, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'

const Header = ({ navigation }) => {
  const { t } = useTranslation()
  const [drop, setDrop] = useState(false)

  return (
    <Box
      row
      paddingHorizontal={10}
      justifySpaceBetween
      zIndex={2}
      marginTop={10}
    >
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
            <Txt marginLeft={18} bold color={'#f7a72e'}>$ 24.8k</Txt>
          </LinearGradient>
        </Btn>

        {/* Account live */}
        <Box>
          <Btn
            onPress={() => setDrop(!drop)}
            row
            backgroundColor={'#354356'}
            padding={7}
            radius={5}
          >
            <Box marginRight={15}>
              <Txt size={13}>{t('Live account')}</Txt>
              <Txt bold>$ 1,000,000</Txt>
            </Box>
            <Image
              source={require('@images/wallet/next.png')}
              style={styles.imgDrop}
            />
          </Btn>
          {drop &&
            <Animated.View
              style={[styles.animatedView]}
            >
              <Txt bold size={16} marginBottom={10}>{t('Change account')}</Txt>
              <Box
                row
                alignCenter
                backgroundColor={'#354356'}
                padding={10}
                radius={5}
                marginBottom={10}
              >
                <Box
                  width={20}
                  height={20}
                  backgroundColor={'white'}
                  radius={50}
                  alignCenter
                  justifyCenter
                  marginRight={10}
                >
                  <Box
                    width={15}
                    height={15}
                    backgroundColor={'#0697e7'}
                    radius={50}
                  />
                  <Box />
                </Box>
                <Box>
                  <Txt>{t('Live account')}</Txt>
                  <Txt bold>$ 10,077.43</Txt>
                </Box>
              </Box>

              <Box
                row
                justifySpaceBetween
                backgroundColor={'#011022'}
                padding={10}
                radius={5}
                marginBottom={10}
              >
                <Box row alignCenter>
                  <Box
                    width={20}
                    height={20}
                    backgroundColor={'white'}
                    radius={50}
                    alignCenter
                    justifyCenter
                    marginRight={10}
                  >
                    <Box
                      width={15}
                      height={15}
                      backgroundColor={'#d1d3d1'}
                      radius={50}
                    />
                  </Box>
                  <Box>
                    <Txt>{t('Live account')}</Txt>
                    <Txt bold>$ 1,000.00</Txt>
                  </Box>
                </Box>
                <Btn>
                  <Img
                    source={require('@images/reload.png')}
                    width={20}
                    height={20}
                  />
                </Btn>
              </Box>
            </Animated.View>
          }
        </Box>

        {/* No tification */}
        <Btn
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
        </Btn>
      </Box>
    </Box>
  )
}

export default Header

const styles = StyleSheet.create({
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
  }
})