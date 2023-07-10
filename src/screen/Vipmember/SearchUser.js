import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { parentListTradingSelector } from '@selector/fundingSelector'
import { themeUserSelector } from '@selector/userSelector'
import fundingSlice from '@slice/fundingSlice'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const SearchUser = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const parentList = useSelector(parentListTradingSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box>
            <Txt size={15} marginTop={15} marginBottom={5} color={COLOR.white}>
                {t('View referrals by username')}
            </Txt>
            <Input
                value={parentList.filterName}
                onChangeText={(text) => dispatch(fundingSlice.actions.setParentList({
                    ...parentList,
                    filterName: text,
                }))}
                color={COLOR.white}
                borderWidth={1}
                borderColor={COLOR.border1}
                height={40}
                width={200}
                radius={5}
                paddingHorizontal={10}
            />
        </Box>
    )
}

export default SearchUser