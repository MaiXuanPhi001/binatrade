import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'

const Fire = () => {
    return (
        <Box marginTop={40} alignCenter zIndex={1}>
            <Img
                source={require('@images/prize/fire.png')}
                marginBottom={-40}
                resizeMode={'contain'}
                width={width * 40 / 100}
            />
            <Box
                width={width * 40 / 100}
                backgroundColor={'#280c7e'}
                paddingVertical={12}
                alignCenter
                radius={30}
                borderWidth={3}
                borderColor={'#5929e6'}
            >
                <Box width={'60%'}>
                    <Txt
                        fontFamily={fonts.Frizon}
                        size={17}
                        center
                        numberOfLines={2}
                        color={colors.yellow2}
                    >
                        PRIZE POOL
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Fire