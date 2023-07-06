import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { styles } from '@screen/Profile/Infomation'
import { profileSelector } from '@selector/userSelector'
import { theme } from '@theme/index'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

const TotalAssets = ({ COLOR }) => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const [showTotal, setShowTotal] = useState(false)

    return (
        <View style={[styles.container, { borderColor: COLOR.border1 }]}>
            <Box
                row
                alignCenter
                justifySpaceBetween
            >
                <Txt bold color={theme.colors.blueText} size={18}>{t('Total Assets (USDT)')}</Txt>
                <Btn
                    onPress={() => setShowTotal(!showTotal)}
                    row
                >
                    <Img
                        source={showTotal ? require('@images/eye-close.png') : require('@images/eye-open.png')}
                        marginRight={5}
                        tintColor={COLOR.white}
                    />
                    <Txt bold color={COLOR.white}>
                        {showTotal ? t('Hide') : t('Show')}
                    </Txt>
                </Btn>
            </Box>

            {!showTotal ? (
                <Txt size={18} marginTop={10} color={COLOR.white}>*********</Txt>
            ) : (
                <Box
                    row
                    alignCenter
                    marginTop={15}
                >
                    <Txt size={20} bold color={COLOR.white}>
                        {numberCommasDot(profile.balance?.toFixed(2))}
                    </Txt>
                    <Img
                        source={require('@images/wallet/money.png')}
                        width={30}
                        height={30}
                        marginLeft={10}
                    />
                </Box>
            )}
        </View>
    )
}

export default TotalAssets