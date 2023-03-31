import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { theme } from '@theme/index'

const InputWallet = ({ 
    title, 
    value, 
    onChangeText, 
    error, 
    messError,
    editAble = true,
}) => {
    return (
        <Box marginBottom={10}>
            <Txt>{title}</Txt>
            <Input
                value={value}
                onChangeText={onChangeText}
                paddingHorizontal={10}
                height={40}
                borderWidth={1}
                borderColor={theme.colors.gray4}
                radius={5}
                marginTop={5}
                disabled={editAble}
                backgroundColor={editAble ? '' : theme.colors.blue2}
            />
            {error && <TextError text={messError} />}
        </Box>
    )
}

export default InputWallet