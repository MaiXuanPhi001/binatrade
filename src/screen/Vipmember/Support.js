import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Support = () => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
        >
            <Txt size={18} bold color={COLOR.white}>{t('Get in touch')}</Txt>

            <Box row alignCenter marginTop={20}>
                <Img
                    source={require('@images/vip/robot.png')}
                />
                <Box marginLeft={10}>
                    <Txt bold size={15} color={COLOR.white}>{t('Support')}</Txt>
                    <Txt
                        marginTop={5}
                        color={colors.sky}
                    >
                        support@pulppy.net
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Support