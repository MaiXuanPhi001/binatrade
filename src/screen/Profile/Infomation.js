import Box from '@commom/Box'
import Img from '@commom/Img'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import ButtonUser from '@reuse/ButtonUser'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import contants from '@util/contants'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { useSelector } from 'react-redux'
import ModalImage from './ModalImage'

const Infomation = () => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const [image, setImage] = useState('')
    const [showModalImg, setShowModalImg] = useState(false)
    const COLOR = colors[useSelector(themeUserSelector)]

    const handleOpenCamera = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            multiple: false,
        }).then(image => {
            setImage(image.path)
            setShowModalImg(true)
        }).catch(err => console.log(err))
    }

    return (
        <View style={[styles.container, { borderColor: COLOR.border1 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>
                {t('Profile')}
            </Txt>
            <Box
                row
                justifySpaceBetween
                marginTop={20}
                alignCenter
            >
                <Box
                    radius={50}
                    borderWidth={2}
                    borderColor={COLOR.border1}
                >
                    <Img
                        source={{ uri: contants.HOSTING + profile.avatar }}
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
                <Txt bold color={COLOR.white}>Email</Txt>
                <Input
                    value={profile.email}
                    disabled={false}
                    style={[styles.input, { borderColor: COLOR.border2 }]}
                />
            </Box>

            <Box marginTop={10}>
                <Txt bold color={COLOR.white}>{t('Username')}</Txt>
                <Input
                    value={profile.userName}
                    disabled={false}
                    style={[styles.input, { borderColor: COLOR.border2 }]}
                />
            </Box>
            <ModalImage
                show={showModalImg}
                setShow={setShowModalImg}
                path={image}
                setPath={setImage}
            />
        </View>
    )
}

export default Infomation

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.gray3,
        padding: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        color: '#56606c',
        padding: 10,
        borderRadius: 5,
        borderColor: colors.gray3,
        marginTop: 5,
    }
})