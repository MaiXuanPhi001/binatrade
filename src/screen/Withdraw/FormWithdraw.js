import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import ButtonLiner from '@reuse/ButtonLiner'
import { profileSelector } from '@selector/userSelector'
import { theme } from '@theme/index'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import AmountUSDT from './AmountUSDT'
import InputWallet from './InputWallet'
import WalletType from './WalletType'
export const BEP20 = 'BEP20'
export const TRC20 = 'TRC20'


const FormWithdraw = ({ t }) => {
    const [wallet, setWallet] = useState(BEP20)
    const [USDT, setUSDT] = useState('')
    const [amount, setAmount] = useState('')
    const profile = useSelector(profileSelector)

    return (
        <Box>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Withdraw')}</Txt>
            <WalletType
                wallet={wallet}
                setWallet={setWallet}
                t={t}
            />
            <InputWallet
                value={USDT}
                onChangeText={setUSDT}
                title={t('Wallet USDT')}
            />
            <AmountUSDT
                amount={amount}
                setAmount={setAmount}
                t={t}
            />
            <Box row alignCenter justifySpaceBetween marginBottom={10}>
                <Txt>{t('Max available')}</Txt>
                <Txt>{numberCommasDot(profile?.balance.toFixed(2))} USDT</Txt>
            </Box>

            <InputWallet
                value={USDT}
                onChangeText={setUSDT}
                title={t('Wallet USDT')}
                editAble={false}
            />
        </Box>
    )
}

export default FormWithdraw

