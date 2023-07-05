import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'

const ModalBuyVip = ({ show, setShow, onBuyMemberVip, loading }) => {
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Box width={'100%'} backgroundColor={theme.colors.drawer} padding={10}>
                <Box row justifySpaceBetween>
                    <Txt></Txt>
                    <Txt size={19} bold>{t('Confirm your participation')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={17} color={colors.gray2}>X</Txt>
                    </Btn>
                </Box>
                <Box alignCenter>
                    <Img
                        source={require('@images/vip/hand-shaking.png')}
                        width={110}
                        height={110}
                        marginVertical={15}
                    />
                    <Box alignCenter marginVertical={15}>
                        <Txt bold>{t('Pay $100 to become VIP member?')}</Txt>
                        <Txt bold>{t('Do you want to pay')}</Txt>
                    </Box>
                    <ButtonLiner
                        onPress={onBuyMemberVip}
                        text={t('Confirm')}
                        height={40}
                        loading={loading}
                    />
                    <Box width={'90%'}>
                        <Txt center color={colors.gray2} size={13} marginVertical={15}>
                            {t('By confirming this action, you accepted that you have read and agreed with our Terms of Service and VIP Obligations')}
                        </Txt>
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalBuyVip