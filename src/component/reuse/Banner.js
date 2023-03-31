import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { height } from '@util/responsive'
import { useTranslation } from 'react-i18next'

const Banner = ({ firtText, secondText, thirdText, onPress }) => {
    const { t } = useTranslation()

    return (
        <Box
            alignCenter
            marginTop={height * 11.312217194570136 / 100}
            marginBottom={30}
        >
            {/* <Img
                resizeMode={'contain'}
                width={'70%'}
                source={require('@images/logo_text.png')}
            /> */}
            <Box
                paddingHorizontal={20}
                alignSelf={'flex-start'}
            >
                <Txt size={23} bold color={theme.colors.blueText}>
                    {t(firtText)}
                </Txt>
                <Txt size={16} marginVertical={10}>
                    {t(secondText)} 
                    <Txt
                        onPress={onPress}
                        bold
                        color={theme.colors.blueText}
                    >
                        {t(thirdText)}
                    </Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default Banner