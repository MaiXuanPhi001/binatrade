import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@screen/Profile/Infomation'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import { useSelector } from 'react-redux'
import { profileSelector } from '@selector/userSelector'
import { numberCommasDot, numberWithCommas } from '@method/format'

const TotalAssets = () => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const [showTotal, setShowTotal] = useState(false)

    return (
        <View style={styles.container}>
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
                    />
                    <Txt bold>{showTotal ? t('Hide') : t('Show')}</Txt>
                </Btn>
            </Box>

            {!showTotal ? (
                <Txt size={18} marginTop={10}>*********</Txt>
            ) : (
                <Box
                    row
                    alignCenter
                    marginTop={15}
                >
                    <Txt size={20} bold>{numberCommasDot(profile.balance)}</Txt>
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