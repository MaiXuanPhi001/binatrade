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
import { useState } from 'react'
import SearchUser from './SearchUser'
import { useTranslation } from 'react-i18next'

const RADIUS = 5

const SearchAffiliate = () => {
    const { t } = useTranslation()
    const dispath = useDispatch()
    const COLOR = colors[useSelector(themeUserSelector)]
    const [searchBy, setSearchBy] = useState('level')

    return (
        <Box zIndex={1}>
            <Txt size={18} bold marginBottom={20} color={COLOR.white}>
                {t('Manage Your Affiliate')}
            </Txt>
            <Txt size={15} color={COLOR.white}>
                {t('Search by')}
            </Txt>
            <Box
                row
                borderWidth={1}
                borderColor={COLOR.border1}
                alignSelf={'flex-start'}
                radius={RADIUS}
                marginTop={10}
            >
                <Btn
                    onPress={() => setSearchBy('level')}
                    padding={10}
                    backgroundColor={searchBy === 'level' && colors.sky}
                    borderTopLeftRadius={RADIUS}
                    borderBottomLeftRadius={RADIUS}
                >
                    <Txt color={COLOR.white}>{t('Level')}</Txt>
                </Btn>
                <Btn
                    onPress={() => setSearchBy('username')}
                    padding={10}
                    backgroundColor={searchBy === 'username' && colors.sky}
                    borderTopRightRadius={RADIUS}
                    borderBottomRightRadius={RADIUS}
                >
                    <Txt color={COLOR.white}>{t('Username')}</Txt>
                </Btn>
            </Box>
            {searchBy === 'level' ? <SelectLevel /> : <SearchUser />}
            <ButtonLiner
                onPress={() => dispath(fundingSlice.actions.searchParentList())}
                text={t('Search')}
                height={40}
                marginTop={10}
                width={110}
            />
            <DateAffiliate />
        </Box>
    )
}

export default SearchAffiliate