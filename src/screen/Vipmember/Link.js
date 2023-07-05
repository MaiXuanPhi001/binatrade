import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import Clipboard from '@react-native-clipboard/clipboard'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import contants from '@util/contants'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'

const Link = () => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]
    const profile = useSelector(profileSelector)

    const LINK = `${contants.HOSTING}/signup/${profile.referral}`

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
        >
            <Item
                title={'Registration link'}
                content={LINK}
                onPress={() => Clipboard.setString(LINK)}
            />
            <Item
                title={'Invitation code'}
                content={profile.referral}
                onPress={() => Clipboard.setString(profile.referral)}
            />
        </Box>
    )
}

const Item = ({ title, content, onPress }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box marginVertical={10}>
            <Txt marginBottom={5} bold color={COLOR.white}>
                {t(title)}
            </Txt>
            <Box
                borderWidth={1}
                borderColor={COLOR.border1}
                row
                justifySpaceBetween
                padding={10}
                alignCenter
                radius={10}
            >
                <Box flex={1}>
                    <Txt numberOfLines={2} color={COLOR.white}>
                        {content}
                    </Txt>
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

export default Link