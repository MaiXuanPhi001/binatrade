import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useDispatch, useSelector } from 'react-redux'
import SelectLevel from './SelectLevel'
import ButtonLiner from '@reuse/ButtonLiner'
import DateAffiliate from './DateAffiliate'
import fundingSlice from '@slice/fundingSlice'

const RADIUS = 5

const SearchAffiliate = () => {
    const dispath = useDispatch()
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box zIndex={1}>
            <Txt size={18} bold marginBottom={20}>Manage Your Affiliate</Txt>
            <Txt size={15}>Search by</Txt>
            <Box
                row
                borderWidth={1}
                borderColor={COLOR.border1}
                alignSelf={'flex-start'}
                radius={RADIUS}
                marginTop={10}
            >
                <Btn
                    padding={10}
                    backgroundColor={colors.sky}
                    borderTopLeftRadius={RADIUS}
                    borderBottomLeftRadius={RADIUS}
                >
                    <Txt>Level</Txt>
                </Btn>
                <Btn
                    padding={10}
                    borderTopRightRadius={RADIUS}
                    borderBottomRightRadius={RADIUS}
                >
                    <Txt>Username</Txt>
                </Btn>
            </Box>
            <SelectLevel />
            <ButtonLiner 
                onPress={() => dispath(fundingSlice.actions.searchParentList())}
                text={'Search'}
                height={40}
                marginTop={10}
                width={110}
            />
            <DateAffiliate />
        </Box>
    )
}

export default SearchAffiliate