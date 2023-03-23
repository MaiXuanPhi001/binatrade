import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'
import Box from '@commom/Box'
import Img from '@commom/Img'
import ButtonUser from '@reuse/ButtonUser'
import { useTranslation } from 'react-i18next'
import Input from '@commom/Input'
import { useSelector } from 'react-redux'
import { profileSelector } from '@selector/userSelector'
import ImagePicker from 'react-native-image-crop-picker';
import ModalImage from './ModalImage'

const Infomation = () => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const [image, setImage] = useState('')
    const [showModalImg, setShowModalImg] = useState(true)

    const handleOpenCamera = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true,
            multiple: false,
        }).then(image => {
            setImage(image.path)
            setShowModalImg(true)
        }).catch(err => console.log(err))
    }

    return (
        <View
            style={styles.container}
        >
            <Txt bold color={theme.colors.blueText} size={18}>{t('Profile')}</Txt>
            <Box
                row
                justifySpaceBetween
                marginTop={20}
                alignCenter
            >
                <Box
                    radius={50}
                    borderWidth={2}
                    borderColor={theme.colors.gray5}
                >
                    <Img
                        source={require('@images/drawer/user.png')}
                        width={60}
                        height={60}
                        radius={50}
                    />
                </Box>

                <ButtonUser
                    onPress={handleOpenCamera}
                    text={t('Upload avatar')}
                    width={150}
                    size={14}
                    height={40}
                />
            </Box>
            <Box marginTop={10}>
                <Txt bold>Email</Txt>
                <Input
                    value={profile.email}
                    disabled={false}
                    style={styles.input}
                />
            </Box>

            <Box marginTop={10}>
                <Txt bold>{t('Username')}</Txt>
                <Input
                    value={profile.userName}
                    disabled={false}
                    style={styles.input}
                />
            </Box>
            <ModalImage 
                show={showModalImg}
                setShow={setShowModalImg}
                path={image}
            />
        </View>
    )
}

export default Infomation

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: theme.colors.gray5,
        padding: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        backgroundColor: '#152333',
        color: '#56606c',
        padding: 10,
        borderRadius: 5,
        borderColor: theme.colors.gray4,
        marginTop: 5,
    }
})