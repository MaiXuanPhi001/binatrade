import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'

const KYCSuccess = ({ COLOR }) => {
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            marginTop={20}
            backgroundColor={COLOR.kycSuccess}
            padding={10}
        >
            <Img
                source={require('@images/profile/check.png')}
                width={25}
                height={25}
                marginRight={5}
            />
            <Txt bold size={16}>{t('Verified')}</Txt>
        </Box>
    )
}

export default KYCSuccess