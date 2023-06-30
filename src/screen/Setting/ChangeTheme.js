import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const ChangeTheme = ({ t }) => {
    const dispatch = useDispatch()
    const theme = useSelector(themeUserSelector)
    const textTheme = theme === 'dark' ? 'Dark' : 'Light'

    const handleChangeTheme = async (value) => {
        const payload = value ? 'dark' : 'light'
        dispatch(userSlice.actions.setTheme(payload))
    }

    return (
        <Box row alignCenter justifySpaceBetween paddingHorizontal={10} marginTop={20}>
            <Box row alignCenter>
                <Img  
                    source={require('@images/profile/palette.png')}
                    tintColor={colors.white}
                    width={25}
                    height={25}
                    marginRight={10}
                />
                <Txt bold size={16}>{t(textTheme)}</Txt>
            </Box>


            <Switch
                trackColor={{ false: "#FF0000", true: "#3EEB45" }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => handleChangeTheme(value)}
                value={theme === 'dark'}
            />
        </Box>
    )
}

export default ChangeTheme