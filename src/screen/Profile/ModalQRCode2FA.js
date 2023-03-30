import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import ButtonLiner from '@reuse/ButtonLiner'
import Modality from '@reuse/Modality'
import { theme } from '@theme/index'
import QRCode from 'react-native-qrcode-svg'

const ModalQRCode2FA = ({ show, setShow, OTPToken, t }) => {

    function applyLetterSpacing(string, count = 3) {
        return string.split('').join('\u200A'.repeat(count));
    }

    return (
        <Modality
            show={show}
        >
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

                <Box padding={15} alignCenter>
                    <Txt marginBottom={20}>{t('Scan this QR code in the authenticator app, or enter the code below manually into the app')}</Txt>
                    <QRCode
                        color={'white'}
                        backgroundColor={theme.colors.btnLogin}
                        value={OTPToken?.otpAuth}
                        size={200}
                    />
                    <Txt marginTop={20} bold size={16}>
                        {applyLetterSpacing(OTPToken?.secret)}
                    </Txt>

                    <Box width={'100%'} marginTop={10} alignEnd>
                        <ButtonLiner
                            text={'Next'}
                            width={100}
                            height={40}
                        />
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalQRCode2FA