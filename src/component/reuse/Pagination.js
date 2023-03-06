import React from 'react'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'

const Pagination = ({
    indexPage,
    total,
    onNext,
    onBack,
    marginTop = 20,
    alignSefl = 'flex-end',
}) => {
    return (
        <Box
            row
            alignCenter
            marginTop={marginTop}
            alignSelf={alignSefl}
        >
            <Btn
                onPress={onBack}
                disabled={indexPage < 2}
                opacity={indexPage < 2 ? .5 : 1}
                borderColor={'#3f4041'}
                borderWidth={1}
                height={30}
                width={30}
                alignCenter
                justifyCenter
                radius={5}
            >
                <Img
                    width={15}
                    height={15}
                    source={require('@images/profile/back.png')}
                />
            </Btn>

            <Box
                borderColor={'#0880c5'}
                borderWidth={1}
                height={32}
                width={32}
                alignCenter
                justifyCenter
                radius={5}
                marginHorizontal={2}
            >
                <Txt color={'#0880c5'}>{indexPage}</Txt>
            </Box>

            <Btn
                onPress={onNext}
                disabled={!(total >= 1 + indexPage * 10)}
                opacity={!(total >= 1 + indexPage * 10) ? .5 : 1}
                borderColor={'#3f4041'}
                borderWidth={1}
                height={30}
                width={30}
                alignCenter
                justifyCenter
                radius={5}
            >
                <Img
                    width={15}
                    height={15}
                    source={require('@images/profile/next.png')}
                />
            </Btn>
        </Box>
    )
}

export default Pagination