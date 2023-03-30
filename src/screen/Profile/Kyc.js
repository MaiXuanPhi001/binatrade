import Box from '@commom/Box'
import ButtonLiner from '@reuse/ButtonLiner'
import { profileSelector } from '@selector/userSelector'
import { kycUser } from '@service/userService'
import { useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import { useSelector } from 'react-redux'
import InputKYC from './InputKYC'
import InputModal from './InputModal'
import ModalCountry from './ModalCountry'
import ModalGender from './ModalGender'
export const CHANGE_FIELD = 'CHANGE_FIELD'
export const CHANGE_MODAL = 'CHANGE_MODAL'

const initialInfomation = {
    firstname: '',
    lastname: '',
    gender: 0,
    passport: '',
    country: '',
    phone: '',
    frontCard: {
        name: '',
        path: '',
    },
    backCard: {
        name: '',
        path: '',
    },
    selfiePhoto: {
        name: '',
        path: '',
    },
    modalGender: false,
    modalCountry: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_FIELD:
            return {
                ...state,
                [action.field]: action.value,
            }
        case CHANGE_MODAL:
            return {
                ...state,
                [action.field]: action.value,
                modalGender: false,
                modalCountry: false,
            }
        default: return state;
    }
};

const Kyc = ({ onChecKYCUser }) => {
    const profile = useSelector(profileSelector)
    const { t } = useTranslation()
    const [infomation, dispatch] = useReducer(reducer, initialInfomation)
    const [loading, setLoading] = useState(false)
    const [checkForm, setCheckForm] = useState(false)

    const handleChangField = (field, value) => {
        dispatch({ type: CHANGE_FIELD, field, value })
    }

    const handleChooseImageFromCamera = (field) => {
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            cropping: false,
            multiple: false,
        }).then(image => {
            dispatch({
                type: CHANGE_FIELD, field, value: {
                    name: image.filename,
                    path: image.path,
                }
            })
        }).catch(err => console.log(err))
    }

    const handleKYCUser = async () => {
        if (infomation.firstname.trim() === '' || infomation.lastname.trim() === '' || infomation.gender === 0
            || infomation.passport.trim() === '' || infomation.country.trim() === '' || infomation.frontCard.name.trim() === ''
            || infomation.backCard.name.trim() === '' || infomation.selfiePhoto.name.trim() === '') {
            return setCheckForm(true)
        }
        setLoading(true)
        let formData = new FormData()
        formData.append('userid', profile.id)
        formData.append('firstname', infomation.firstname)
        formData.append('lastname', infomation.lastname)
        formData.append('gender', infomation.gender)
        formData.append('passport', infomation.passport)
        formData.append('country', infomation.country)
        formData.append('phone', infomation.phone)
        formData.append('photo', { uri: Platform.OS === 'ios' ? infomation.frontCard.path.replace('file://', '') : infomation.frontCard.path, name: 'image.jpg', type: 'image/jpg' })
        formData.append('photo', { uri: Platform.OS === 'ios' ? infomation.backCard.path.replace('file://', '') : infomation.backCard.path, name: 'image.jpg', type: 'image/jpg' })
        formData.append('photo', { uri: Platform.OS === 'ios' ? infomation.selfiePhoto.path.replace('file://', '') : infomation.selfiePhoto.path, name: 'image.jpg', type: 'image/jpg' })

        const res = await kycUser(formData)
        !res.status && alert(t(res.message))
        setLoading(false)
        onChecKYCUser()
    }

    return (
        <Box marginTop={10}>
            <InputKYC
                title={t('First name')}
                value={infomation.firstname}
                error={checkForm && infomation.firstname.trim() === ''}
                messError={t('First name is empty')}
                onChangeText={txt => handleChangField('firstname', txt)}
            />
            <InputKYC
                title={t('Last name')}
                value={infomation.lastname}
                error={checkForm && infomation.lastname.trim() === ''}
                messError={t('Last name is empty')}
                onChangeText={txt => handleChangField('lastname', txt)}
            />
            <InputModal
                title={t('Gender')}
                value={t(infomation.gender === 0 ? '' : infomation.gender === 1 ? 'Male' : 'Female')}
                error={checkForm && infomation.gender === 0}
                messError={'Please select your gender'}
                image={require('@images/down.png')}
                onPress={() => handleChangField('modalGender', true)}
            />
            <InputKYC
                title={t('Passport')}
                value={infomation.passport}
                error={checkForm && infomation.passport.trim() === ''}
                messError={t('Passport is empty')}
                onChangeText={txt => handleChangField('passport', txt)}
            />
            <InputModal
                title={t('Country')}
                value={infomation.country}
                error={checkForm && infomation.country === ''}
                messError={'Please select your country'}
                image={require('@images/down.png')}
                onPress={() => handleChangField('modalCountry', true)}
            />
            <InputKYC
                title={t('Phone')}
                value={infomation.phone}
                error={checkForm && infomation.phone.trim() === ''}
                messError={t('Phone is empty')}
                onChangeText={txt => handleChangField('phone', txt)}
            />
            <InputModal
                title={t('Front identity card')}
                value={infomation.frontCard.name}
                error={checkForm && infomation.frontCard.name === ''}
                messError={t('Please select your photo front identity card')}
                image={require('@images/profile/img_upload.png')}
                onPress={() => handleChooseImageFromCamera('frontCard')}
            />
            <InputModal
                title={t('Back identity card')}
                value={infomation.backCard.name}
                error={checkForm && infomation.backCard.name.trim() === ''}
                messError={t('Please select your photo back identity card')}
                image={require('@images/profile/img_upload.png')}
                onPress={() => handleChooseImageFromCamera('backCard')}
            />
            <InputModal
                title={t('Selfie photo')}
                value={infomation.selfiePhoto.name}
                error={checkForm && infomation.selfiePhoto.name.trim() === ''}
                messError={t('Please select your selfie photo')}
                image={require('@images/profile/img_upload.png')}
                onPress={() => handleChooseImageFromCamera('selfiePhoto')}
            />
            <ButtonLiner
                text={t('Save')}
                onPress={handleKYCUser}
                loading={loading}
                width={100}
                height={40}
                marginTop={10}
            />
            <ModalGender
                show={infomation.modalGender}
                dispatch={dispatch}
            />
            <ModalCountry
                show={infomation.modalCountry}
                dispatch={dispatch}
            />
        </Box>
    )
}

export default Kyc