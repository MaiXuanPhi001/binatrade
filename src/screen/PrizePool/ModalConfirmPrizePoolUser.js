import { getPrizePoolUserThunk } from "@asyncThunk/fundingAsyncThunk"
import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Input from "@commom/Input"
import Txt from "@commom/Txt"
import ButtonLiner from "@reuse/ButtonLiner"
import Modality from "@reuse/Modality"
import TextError from "@reuse/TextError"
import { yourHistoryFundingSelector } from "@selector/fundingSelector"
import { confirmPrizePoolUser } from "@service/fundingService"
import { theme } from "@theme/index"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"

const ModalConfirmPrizePoolUser = ({ isShow, setShow, history }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const yourHistory = useSelector(yourHistoryFundingSelector)

    const handleConfirmPrizePoolUser = async () => {
        setLoading(true)
        const res = await confirmPrizePoolUser({
            id: history.id,
            otp,
        })

        if (res.status) {
            await dispatch(getPrizePoolUserThunk({
                limit: 10,
                page: yourHistory.page,
            }))
        } else {
            Alert.alert(res.message)
        }
        setLoading(false)
        setShow(false)
    }

    return (
        <Modality show={isShow}>
            <Box
                width={'95%'}
                backgroundColor={theme.colors.drawer}
            >
                <Box
                    row
                    alignCenter
                    padding={15}
                    justifySpaceBetween
                    borderBottomWidth={1}
                    borderColor={'#303030'}
                >
                    <Txt size={15} bold>{t('Confirm your prize')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box padding={15}>
                    <Txt>{t('Your 2FA Code')}</Txt>
                    <Input
                        value={otp}
                        onChangeText={setOtp}
                        borderWidth={1}
                        borderColor={theme.colors.gray4}
                        height={40}
                        radius={5}
                        marginVertical={10}
                        paddingHorizontal={10}
                        marginBottom={5}
                    />
                    {/* {(checkForm && otp.trim() === '')&& <TextError text={t('Code is empty')} />} */}

                    <Box row justifyEnd marginTop={20}>
                        <Btn
                            onPress={() => setShow(false)}
                            borderWidth={1}
                            borderColor={theme.colors.gray4}
                            height={40}
                            width={100}
                            radius={10}
                            marginRight={10}
                        >
                            <Txt>{t('Cancel')}</Txt>
                        </Btn>

                        <ButtonLiner
                            onPress={handleConfirmPrizePoolUser}
                            loading={loading}
                            text={t('Confirm')}
                            width={130}
                            height={40}
                        />
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalConfirmPrizePoolUser