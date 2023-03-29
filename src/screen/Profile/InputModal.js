import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { theme } from '@theme/index'

const InputModal = ({ title, value, error, messError, onPress, image }) => {
    return (
        <Box marginBottom={10} width={'100%'}>
            <Txt bold>{title}</Txt>
            <Btn
                row
                onPress={onPress}
                width={'100%'}
                paddingHorizontal={10}
                height={40}
                borderWidth={1}
                borderColor={theme.colors.gray4}
                radius={5}
                marginTop={5}
                justifySpaceBetween
            >
                <Box flex={1}>
                    <Txt>{value}</Txt>
                </Box>
                <Img
                    source={image}
                    width={20}
                    height={20}
                    opacity={0.5}
                    marginLeft={10}
                />
            </Btn>

            {error &&
                <TextError text={messError} />
            }
        </Box>
    )
}

export default InputModal