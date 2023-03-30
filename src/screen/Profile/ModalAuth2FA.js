import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import Modality from '@reuse/Modality'
import TextError from '@reuse/TextError'
import { turn2FA } from '@service/userService'
import { theme } from '@theme/index'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ModalAuth2FA = ({ show, t, setShow, setShowModal2FA, twofa }) => {
    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [checkForm, setChecForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleTurnOnOff2FA = async () => {
        if (code.trim() === '') {
            return setChecForm(true)
        }
        setLoading(true)
        const res = await turn2FA(code)
        if (res.status) {
            dispatch(getProfileThunk())
            setShow(false)
        } else {
            alert(t(res.message))
        }
        setLoading(false)
    }

    return (
        <Modality show={show}>
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
                    <Txt size={15} bold>{t('Two-Factor Authentication (2FA)')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box padding={15}>
                    <Txt>{t('Enter the 6-digit code from authenticator app')}</Txt>
                    <Input
                        value={code}
                        onChangeText={setCode}
                        borderWidth={1}
                        borderColor={theme.colors.gray4}
                        height={40}
                        radius={5}
                        marginVertical={10}
                        paddingHorizontal={10}
                        marginBottom={5}
                    />
                    {checkForm && <TextError text={t('Code is empty')} />}

                    <Box row justifyEnd marginTop={20}>
                        <Btn
                            onPress={() => {
                                setShow(false)
                                setShowModal2FA(true)
                            }}
                            borderWidth={1}
                            borderColor={theme.colors.gray4}
                            height={40}
                            width={100}
                            radius={10}
                            marginRight={10}
                        >
                            <Txt>{t('Previous')}</Txt>
                        </Btn>

                        <ButtonLiner
                            onPress={handleTurnOnOff2FA}
                            loading={loading}
                            text={t(!twofa ? 'Turn on 2FA' : 'Turn off 2FA')}
                            width={130}
                            height={40}
                        />
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalAuth2FA