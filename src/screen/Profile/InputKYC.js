import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'

const InputKYC = ({ title, value, onChangeText, error, messError }) => {
    const COLORS = colors[useSelector(themeUserSelector)]

    return (
        <Box marginBottom={10}>
            <Txt bold color={COLORS.white}>{title}</Txt>
            <Input
                value={value}
                onChangeText={onChangeText}
                color={COLORS.white}
                paddingHorizontal={10}
                height={40}
                borderWidth={1}
                borderColor={COLORS.border2}
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