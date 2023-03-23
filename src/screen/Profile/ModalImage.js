import React from 'react'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { height } from '@util/responsive'

const ModalImage = ({ show, setShow, path }) => {
    const { t } = useTranslation()
    return (
        <Modality
            show={show}
        >
            <Box
                backgroundColor={theme.colors.drawer}
                width={'90%'}
            >
                <Box
                    row
                    alignCenter
                    justifySpaceBetween
                    padding={15}
                    borderBottomWidth={1}
                    borderColor={'gray'}
                >
                    <Box />
                    <Txt bold size={16}>
                        {t('Upload avatar')}
                    </Txt>
                    <Txt onPress={() => setShow(false)} bold size={18}>
                        X
                    </Txt>
                </Box>

                <Box
                    paddingHorizontal={20}
                    paddingVertical={15}
                >
                    <Box
                        backgroundColor={theme.colors.background}
                        height={height * 30 / 100}
                    >

                    </Box>
                    <Txt color='gray2' bold marginVertical={10}>* Image size must be less than 3MB</Txt>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalImage