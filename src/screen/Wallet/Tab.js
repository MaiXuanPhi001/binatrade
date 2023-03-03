import { View } from 'react-native'
import React from 'react'
import { styles } from '@screen/Profile/Infomation'
import Box from '@commom/Box'
import { useTranslation } from 'react-i18next'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'

const Tab = () => {
    const { t } = useTranslation()

    const data = [
        {
            title: t('Deposit'),
            onPress: () => { },
        },
        {
            title: t('Withdraw'),
            onPress: () => { },
        },
        {
            title: t('Transfer'),
            onPress: () => { },
        },
    ]

    return (
        <View style={[styles.container, { marginTop: 20 }]}>
            <Box row>
                {data.map(item =>
                    <Item
                        key={item.id}
                        item={item}
                    />
                )}
            </Box>
        </View>
    )
}

const Item = ({ item }) => {
    return (
        <Btn
            onPress={item.onPress}
            backgroundColor={theme.colors.black2}
            margin={5}
            paddingHorizontal={15}
            paddingVertical={10}
            borderWidth={1}
            radius={5}
            borderColor={theme.colors.gray4}
        >
            <Txt bold>{item.title}</Txt>
        </Btn>
    )
}

export default Tab