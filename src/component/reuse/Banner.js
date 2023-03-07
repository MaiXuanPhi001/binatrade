import React from 'react'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import Box from '@commom/Box'
import { useTranslation } from 'react-i18next'
import { theme } from '@theme/index'
import { height, width } from '@util/responsive'

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