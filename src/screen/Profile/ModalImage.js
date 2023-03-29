import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import Modality from '@reuse/Modality'
import { profileSelector } from '@selector/userSelector'
import { uploadAvatar } from '@service/userService'
import { theme } from '@theme/index'
import { height } from '@util/responsive'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'react-native-image-crop-picker'
import { useDispatch, useSelector } from 'react-redux'

const ModalImage = ({ show, setShow, path, setPath }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const profile = useSelector(profileSelector)
    const [loading, setLoading] = useState(false)

    const handleOpenCamera = async () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            multiple: false,
        }).then(image => {
            setPath(image.path)
        }).catch(err => console.log(err))
    }

    const handleUploadAvatar = async () => {
        setLoading(true)
        let formdata = new FormData()
        formdata.append('userid', profile.id)
        formdata.append('image', {
            uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
            name: 'image.jpg',
            type: 'image/jpg'
        })

        const res = await uploadAvatar(formdata)

        !res.status && alert(res.message)
        res.status && dispatch(getProfileThunk())
        setLoading(false)
        setShow(false)
    }

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Box
                backgroundColor={theme.colors.drawer}
                width={'90%'}
            >
                <Box
                    row
                    alignCenter
                    justifySpaceBetween
                    padding={15}
                    borderBottomWidth={1}
                    borderColor={'gray'}
                >
                    <Box />
                    <Txt bold size={16}>
                        {t('Upload avatar')}
                    </Txt>
                    <Txt onPress={() => setShow(false)} bold size={18}>
                        X
                    </Txt>
                </Box>

                <Box paddingHorizontal={20} paddingVertical={15} >
                    <Box
                        backgroundColor={theme.colors.background}
                        height={height * 30 / 100}
                    >
                        {path &&
                            <Img
                                source={{ uri: path }}
                                resizeMode={'contain'}
                                height={'100%'}
                                width={'100%'}
                            />
                        }
                    </Box>
                    <Txt color='gray2' bold marginVertical={10}>{t('* Image size must be less than 3MB')}</Txt>

                    <Box
                        row
                        borderTopWidth={1}
                        borderColor={'gray'}
                        alignCenter
                        paddingTop={10}
                        justifySpaceBetween
                    >
                        <Btn
                            onPress={handleOpenCamera}
                            width={'51%'}
                            borderColor={'gray'}
                            borderWidth={1}
                            radius={10}
                            height={40}
                        >
                            <Txt>{t('Choose another image')}</Txt>
                        </Btn>

                        <ButtonLiner
                            onPress={handleUploadAvatar}
                            loading={loading}
                            width={'45%'}
                            height={40}
                            text={t('Upload avatarr')}
                        />
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalImage