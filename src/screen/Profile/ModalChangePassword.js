import React, { useState } from 'react'
import { theme } from '@theme/index'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import ButtonLiner from '@reuse/ButtonLiner'
import { StyleSheet } from 'react-native'
import TextError from '@reuse/TextError'
import { changePassword } from '@service/userService'

const ModalChangePassword = ({ show, setShow, t }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [checkForm, setChecForm] = useState(false)
    const [security, setSecurity] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleChangePassword = async () => {
        if (oldPassword.trim() === '' || newPassword.trim() === '') {
            return setChecForm(true)
        }
        setLoading(true)
        const res = await changePassword({ password: oldPassword, newPassword: newPassword })
        if (res.status) {
            setShow(false)
            alert(t('Change password successfully!'))
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
                    <Txt size={15} bold>{t('Change password')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box padding={15}>
                    <Txt>{t('Current password')}</Txt>
                    <Input
                        onPress={() => setSecurity(!security)}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        security={security}
                        iconTwo={security ? require('@images/eye-open.png') : require('@images/eye-close.png')}
                        borderColor={theme.colors.gray4}
                        borderWidth={1}
                        height={45}
                        paddingLeft={10}
                        paddingRight={50}
                        radius={5}
                        marginTop={10}
                    />
                    {(checkForm && oldPassword.trim() === '') && <TextError text={t('Old password is empty')} />}

                    <Txt marginTop={20}>{t('New password')}</Txt>
                    <Input
                        onPress={() => setSecurity(!security)}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        security={security}
                        iconTwo={security ? require('@images/eye-open.png') : require('@images/eye-close.png')}
                        borderColor={theme.colors.gray4}
                        borderWidth={1}
                        height={45}
                        paddingLeft={10}
                        paddingRight={50}
                        radius={5}
                        marginTop={10}
                    />
                    {(checkForm && newPassword.trim() === '') && <TextError text={t('New password is empty')} />}

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
                            onPress={handleChangePassword}
                            loading={loading}
                            text={t('Change password')}
                            width={140}
                            height={40}
                        />
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalChangePassword

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderColor: theme.colors.gray4,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 50,
        borderRadius: 5,
        marginTop: 10,
    }
})