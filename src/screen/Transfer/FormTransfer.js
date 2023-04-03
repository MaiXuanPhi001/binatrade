import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import ButtonLiner from '@reuse/ButtonLiner'
import LoadingWhite from '@reuse/LoadingWhite'
import TextError from '@reuse/TextError'
import InputWallet from '@screen/Withdraw/InputWallet'
import Warning from '@screen/Withdraw/Warning'
import { getValueConfig, transfer } from '@service/fundingService'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

const FormTransfer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('')
  const [receive, setReceive] = useState('')
  const [note, setNote] = useState('')
  const [twoFA, setTwoFA] = useState('')
  const [fee, setFee] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [checkForm, setCheckForm] = useState(false)

  useEffect(() => {
    handleGetValueConfig()
  }, [])

  const handleGetValueConfig = async () => {
    setLoading(true)
    const res = await getValueConfig('transfer')
    if (res.status && res.data.length > 0) {
      setFee(res.data[0].value)
      setLoading(false)
    }
  }

  const handleTransfer = async () => {
    if (amount.trim() === '' || Number(amount) < 50 || receive.trim() === ''
      || note.trim() === '' || twoFA.trim() === '') {
      return setCheckForm(true)
    }
    setLoadingButton(true)
    const res = await transfer({
      amount,
      api: 'transfer',
      note,
      otp: twoFA,
      userNameTo: receive,
    })
    res.status && clearForm()

    alert(t(res.message))
    setLoadingButton(false)
  }

  const clearForm = () => {
    setAmount('')
    setReceive('')
    setNote('')
    setTwoFA('')
    setCheckForm(false)
    dispatch(getProfileThunk())
  }

  return (
    <>
      {loading ? (
        <LoadingWhite />
      ) : (
        <Box marginTop={15}>
          <InputWallet
            value={amount}
            onChangeText={setAmount}
            title={t('Amount')}
            error={checkForm && amount.trim() === ''}
            messError={t('Amount is empty')}
          />
          {(checkForm && Number(amount) < 50 && amount.trim() !== '') &&
            <Box marginTop={-10} marginBottom={10}>
              <TextError text={t('Minimum amount is $50')} />
            </Box>
          }
          <InputWallet
            value={receive}
            onChangeText={setReceive}
            title={t('User receive')}
            error={checkForm && receive.trim() === ''}
            messError={t('Receive is empty')}
          />
          <InputWallet
            value={note}
            onChangeText={setNote}
            title={t('Note')}
            error={checkForm && note.trim() === ''}
            messError={t('Note is empty')}
          />
          <InputWallet
            value={twoFA}
            onChangeText={setTwoFA}
            title={t('2FA')}
            error={checkForm && twoFA.trim() === ''}
            messError={t('2FA is empty')}
          />

          <Box paddingRight={20} marginTop={10} marginBottom={20}>
            <Warning text={t('Transfer fee: $') + fee} />
            <Warning text={t('Minimum amount is $50')} />
          </Box>

          <ButtonLiner
            onPress={handleTransfer}
            text={t('Transfer')}
            loading={loadingButton}
            width={140}
            height={40}
          />
        </Box>
      )}
    </>
  )
}

export default FormTransfer