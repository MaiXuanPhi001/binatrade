import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { navigate } from '@navigation/navigationRef'
import ButtonUser from '@reuse/ButtonUser'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import routes from '@util/routes'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

const MoreInfomation = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <Box marginTop={80} alignCenter>
            <ButtonUser
                text={t('Trade & Win Challenge')}
                onPress={() => {
                    dispatch(userSlice.actions.setScreenChoose(routes.TRADING))
                    navigate(routes.TRADING)
                }}
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