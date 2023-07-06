import { getAllOrderPendingUserThunk } from '@asyncThunk/tradingAsyncThunk'
import { orderTradingSelector } from '@selector/tradingSelector'
import { themeUserSelector, typeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const Profit = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const order = useSelector(orderTradingSelector)
    const typeUser = useSelector(typeUserSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

    useEffect(() => {
        handleGellAllOrderPendingUser()
    }, [])

    const handleGellAllOrderPendingUser = async () => {
        await dispatch(getAllOrderPendingUserThunk(typeUser))
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.textPercent, {color: COLOR.white}]}>{t('Profit')}
                <Text style={styles.text95}> 95%</Text>
                <Text style={styles.textProfit}>   ${order.profit.toFixed(2)}</Text>
            </Text>
        </View>
    )
}

export default Profit

const styles = StyleSheet.create({
    textProfit: {
        fontSize: 18,
        color: theme.colors.greenNen,
    },
    text95: {
        fontSize: 16,
    },
    textPercent: {
        fontWeight: 'bold',
    },
    container: {
        alignItems: 'center',
        marginBottom: 10,
    }
})