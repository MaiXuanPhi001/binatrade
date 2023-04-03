import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import ButtonLiner from '@reuse/ButtonLiner'
import LoadingWhite from '@reuse/LoadingWhite'
import { profileSelector } from '@selector/userSelector'
import { getValueConfig, withDraw } from '@service/fundingService'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AmountUSDT from './AmountUSDT'
import InputWallet from './InputWallet'
import WalletType from './WalletType'
import Warning from './Warning'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import TextError from '@reuse/TextError'
export const BEP20 = 'BEP20'
export const TRC20 = 'TRC20'

const FormWithdraw = ({ t }) => {
    const dispatch = useDispatch()
    const [wallet, setWallet] = useState(BEP20)
    const [USDT, setUSDT] = useState('')
    const [amount, setAmount] = useState('')
    const [twoFA, setTwoFA] = useState('')
    const [fee, setFee] = useState(1)
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [checkForm, setCheckForm] = useState(false)
    const profile = useSelector(profileSelector)

    useEffect(() => {
        handleGetValueConfig()
    }, [])

    const handleGetValueConfig = async () => {
        setLoading(true)
        const res = await getValueConfig('withdraw')
        if (res.status && res.data.length > 0) {
            setFee(res.data[0].value)
            setLoading(false)
        }
    }

    const handleWithdraw = async () => {
        if (USDT.trim() === '' || amount.trim() === '' || Number(amount) < 50
            || twoFA.trim() === '') {
            return setCheckForm(true)
        }
        setLoadingButton(true)
        const res = await withDraw({
            amount,
            network: wallet,
            otp: twoFA,
            symbol: 'USDT',
            toAddress: USDT
        })
        res.status && clearForm()

        alert(t(res.message))
        setLoadingButton(false)
    }

    const clearForm = async () => {
        setAmount('')
        setUSDT('')
        setTwoFA('')
        setCheckForm(false)
        dispatch(getProfileThunk())
    }

    return (
        <>
            {loading ? (
                <LoadingWhite />
            ) : (
                <Box>
                    <Txt bold color={theme.colors.blueText} size={18}>{t('Withdraw')}</Txt >
                    <WalletType
                        wallet={wallet}
                        setWallet={setWallet}
                        t={t}
                    />
                    <InputWallet
                        value={USDT}
                        onChangeText={setUSDT}
                        title={t('Wallet USDT')}
                        error={checkForm && USDT.trim() === ''}
                        messError={t('Wallet USDT is empty')}
                    />
                    <AmountUSDT
                        amount={amount}
                        setAmount={setAmount}
                        t={t}
                        profile={profile}
                        checkForm={checkForm}
                    />
                    {(checkForm && Number(amount) < 50 && amount.trim() !== '') &&
                        <Box marginTop={-10} marginBottom={10}>
                            <TextError text={t('Minimum amount is $50')} />
                        </Box>
                    }

                    <Box row alignCenter justifySpaceBetween marginBottom={10}>
                        <Txt>{t('Max available')}</Txt>
                        <Txt>{numberCommasDot(profile?.balance.toFixed(2))} USDT</Txt>
                    </Box>

                    <InputWallet
                        value={Number(amount) - 1 < 0 ? '0' : String(Number(amount) - 1)}
                        onChangeText={setUSDT}
                        title={t('Wallet USDT')}
                        editAble={false}
                    />

                    <InputWallet
                        value={twoFA}
                        onChangeText={setTwoFA}
                        title={t('2FA')}
                        error={checkForm && twoFA.trim() === ''}
                        messError={t('2FA is empty')}
                    />

                    <Box paddingRight={20} marginTop={10} marginBottom={20}>
                        <Warning text={t('Withdrawal fee: $') + fee} />
                        <Warning text={t('Mỗi giao dịch yêu cầu số tiền tối thiểu là $50')} />
                    </Box>

                    <ButtonLiner
                        onPress={handleWithdraw}
                        text={t('Withdraw')}
                        loading={loadingButton}
                        width={120}
                        height={40}
                    />
                </Box >
            )}
        </>
    )
}

export default FormWithdraw

