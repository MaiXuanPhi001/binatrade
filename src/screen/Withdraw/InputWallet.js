import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useSelector } from 'react-redux'

const InputWallet = ({ 
    title, 
    value, 
    onChangeText, 
    error, 
    messError,
    editAble = true,
}) => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box marginBottom={10}>
            <Txt color={COLOR.white}>{title}</Txt>
            <Input
                value={value}
                onChangeText={onChangeText}
                color={COLOR.white}
                paddingHorizontal={10}
                height={40}
                borderWidth={1}
                borderColor={COLOR.border2}
                radius={5}
                marginTop={5}
                disabled={editAble}
                backgroundColor={editAble ? '' : COLOR.blue}
            />
            {error && <TextError text={messError} />}
        </Box>
    )
}

export default InputWallet