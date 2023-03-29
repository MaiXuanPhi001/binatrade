import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { theme } from '@theme/index'

const InputKYC = ({ title, value, onChangeText, error, messError }) => {
    return (
        <Box marginBottom={10}>
            <Txt bold>{title}</Txt>
            <Input
                value={value}
                onChangeText={onChangeText}
                paddingHorizontal={10}
                height={40}
                borderWidth={1}
                borderColor={theme.colors.gray4}
                radius={5}
                marginTop={5}
            />
            {error &&
                <TextError text={messError} />
            }
        </Box>
    )
}

export default InputKYC