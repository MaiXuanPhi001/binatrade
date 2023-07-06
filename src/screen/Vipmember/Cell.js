import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'

const Cell = ({ title, content, onPress }) => {
  const { t } = useTranslation()

  return (
    <Box marginVertical={10}>
      <Txt marginBottom={5} bold>{t(title)}</Txt>
      <Box
        borderWidth={1}
        borderColor={colors.gray5}
        row
        justifySpaceBetween
        padding={10}
        alignCenter
        radius={10}
      >
        <Box flex={1}>
          <Txt numberOfLines={2}>{content}</Txt>
        </Box>
        <Btn onPress={onPress}>
          <LinearGradient
            colors={['#1998e6', '#4cb0d9', '#7ccdc9']}
            style={{ padding: 5, borderRadius: 5 }}
          >
            <Img
              source={require('@images/vip/copy.png')}
              tintColor={colors.white}
              width={17}
              height={17}
            />
          </LinearGradient>
        </Btn>
      </Box>
    </Box >
  )
}

export default Cell