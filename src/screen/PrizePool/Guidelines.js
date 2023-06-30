import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import Challenge from './Challenge'
import { fonts } from '@theme/fonts'
import { useTranslation } from 'react-i18next'

const SIZE_IMG_ROCKET = width * 30 / 100

const Guidelines = () => {
    const { t } = useTranslation()

    return (
        <Box padding={10} backgroundColor={'#0f0231'}>
            <Img
                source={require('@images/prize/rocket1.png')}
                width={SIZE_IMG_ROCKET}
                height={SIZE_IMG_ROCKET}
                resizeMode={'contain'}
                marginTop={-(SIZE_IMG_ROCKET / 3)}
                marginLeft={-40}
            />
            <Txt bold size={16} color={colors.yellow2}>
                {t('Guidelines')}
            </Txt>
            <Txt bold size={25} fontFamily={fonts.Frizon} marginTop={20}>
                {t('HOW TO JOIN')}
            </Txt>
            <Txt bold size={25} fontFamily={fonts.Frizon} marginTop={10} marginBottom={10}>
                {t('CHALLENGE')}
            </Txt>
            <Challenge />
        </Box>
    )
}

export default Guidelines