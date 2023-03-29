import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import Modality from '@reuse/Modality'
import { theme } from '@theme/index'
import { height } from '@util/responsive'
import { useTranslation } from 'react-i18next'
import { CHANGE_FIELD, CHANGE_GENDER, CHANGE_MODAL } from './Kyc'

const ModalGender = ({ show, dispatch }) => {
    const { t } = useTranslation()
    return (
        <Modality
            show={show}
            setShow={() => dispatch({ type: CHANGE_FIELD, field: 'modalGender', value: false })}
        >
            <Box width={'80%'} backgroundColor={theme.colors.gray5} marginTop={-(height * 20 / 100)}>
                <Btn
                    onPress={() => dispatch({ type: CHANGE_MODAL, field: 'gender', value: 1 })}
                    width={'100%'}
                    padding={15}
                    alignCenter={false}
                    borderBottomWidth={0.2}
                    borderColor={theme.colors.white}
                >
                    <Txt>{t('Male')}</Txt>
                </Btn>

                <Btn
                    onPress={() => dispatch({ type: CHANGE_MODAL, field: 'gender', value: 2 })}
                    width={'100%'}
                    padding={15}
                    alignCenter={false}
                >
                    <Txt>{t('Female')}</Txt>
                </Btn>
            </Box>
        </Modality>
    )
}

export default ModalGender