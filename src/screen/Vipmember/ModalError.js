import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'

const ModalError = ({ show, setShow, onDeposit }) => {
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Box width={'100%'} backgroundColor={theme.colors.drawer} padding={10}>
                <Box row justifySpaceBetween>
                    <Txt></Txt>
                    <Txt size={19} bold>{t('Your balance is not enough')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={17} color={colors.gray2}>X</Txt>
                    </Btn>
                </Box>
                <Box alignCenter marginBottom={20}>
                    <Img
                        source={require('@images/vip/not-enough.png')}
                        width={150}
                        height={110}
                        marginVertical={15}
                    />
                    <ButtonLiner
                        onPress={onDeposit}
                        text={t('Deposit now')}
                        height={40}
                        width={160}
                        marginTop={20}
                    />
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalError