import { StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { width } from '@util/responsive'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'

const NoDataTable = () => {
    const { t } = useTranslation()
    return (
        <Box width={width} alignCenter>
            <Img
                source={require('@images/option/empty-box.png')}
                width={50}
                height={50}
            />
            <Txt>{t('noData')}</Txt>
        </Box>
    )
}

export default NoDataTable

const styles = StyleSheet.create({})