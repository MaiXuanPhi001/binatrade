import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'

const KYCPending = ({ COLOR }) => {
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            marginTop={20}
            backgroundColor={COLOR.brown}
            padding={10}
        >
            <Img
                source={require('@images/profile/danger-sign.png')}
                width={25}
                height={25}
                marginRight={5}
            />
            <Txt bold size={16}>{t('Pending2')}</Txt>
        </Box>
    )
}

export default KYCPending