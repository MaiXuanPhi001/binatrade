import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import ButtonUser from '@reuse/ButtonUser'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

const MoreInfomation = () => {
    const { t } = useTranslation()

    return (
        <Box marginTop={80} alignCenter>
            <ButtonUser
                text={t('Trade & Win Challenge')}
                width={190}
                size={14}
                height={45}
            />

            <Btn marginTop={40} marginBottom={60}>
                <Txt color={colors.sky}>
                    {t('More infomation')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default MoreInfomation