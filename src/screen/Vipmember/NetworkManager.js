import Box from '@commom/Box'
import SearchAffiliate from './SearchAffiliate'
import HeaderTableAffiliate from './HeaderTableAffiliate'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useDispatch, useSelector } from 'react-redux'
import { parentListTradingSelector } from '@selector/fundingSelector'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { getParentListThunk } from '@asyncThunk/fundingAsyncThunk'
import { profileSelector, themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'

const NetworkManager = () => {
    const dispath = useDispatch()
    const { t } = useTranslation()
    const parentList = useSelector(parentListTradingSelector)
    const profile = useSelector(profileSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

    useEffect(() => {
        handleGetParentList()
    }, [])

    const handleGetParentList = async () => {
        await dispath(getParentListThunk(profile.id))
    }

    return (
        <Box marginTop={15}>
            <SearchAffiliate />
            <Scroll horizontal>
                <Box>
                    <HeaderTableAffiliate />
                    {parentList.data.map((item) =>
                        <Item
                            key={item.id}
                            item={item}
                            t={t}
                            COLOR={COLOR}
                            parentList={parentList}
                        />
                    )}
                </Box>
            </Scroll>
        </Box>
    )
}

const Item = ({ item, t, COLOR, parentList }) => {
    const sizeText = 13

    return (
        <Box
            row
            alignCenter
            height={45}
            borderBottomWidth={0.5}
            borderColor={COLOR.gray}
        >
            <Box
                paddingHorizontal={5}
                width={130}
            >
                <Txt size={sizeText} color={COLOR.white}>
                    {item.userName}
                </Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={80}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    {item?.level}
                </Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={80}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    {item?.[parentList.fieldTotal]}
                </Txt>
            </Box>

            <Box
                alignStart
                width={200}
            >
                <Txt size={sizeText} bold color={COLOR.white2}>
                    {item?.[parentList.fieldCommission]}
                </Txt>
            </Box>
        </Box>
    )
}

export default NetworkManager