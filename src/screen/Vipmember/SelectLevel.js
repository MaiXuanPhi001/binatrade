import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { parentListTradingSelector } from '@selector/fundingSelector'
import { themeUserSelector } from '@selector/userSelector'
import fundingSlice from '@slice/fundingSlice'
import { colors } from '@theme/colors'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const levels = [
    { title: 'Level 1', value: 1 },
    { title: 'Level 2', value: 2 },
    { title: 'Level 3', value: 3 },
    { title: 'Level 4', value: 4 },
    { title: 'Level 5', value: 5 },
    { title: 'Level 6', value: 6 },
    { title: 'Level 7', value: 7 },
]

const SelectLevel = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const COLOR = colors[useSelector(themeUserSelector)]
    const parentList = useSelector(parentListTradingSelector)
    const [down, setDown] = useState(false)

    const handleSetLevelParentList = async (item) => {
        dispatch(fundingSlice.actions.setParentList({
            ...parentList,
            level: item.value,
        }))
        setDown(false)
    }

    return (
        <Box zIndex={1}>
            <Txt size={15} marginTop={15} marginBottom={5} color={COLOR.white}>
                {t('View referrals by level')}
            </Txt>
            <Box width={200}>
                <Btn
                    onPress={() => setDown(!down)}
                    borderWidth={1}
                    borderColor={COLOR.border1}
                    row
                    justifySpaceBetween
                    height={40}
                    paddingHorizontal={10}
                    width={'100%'}
                    radius={7}
                >
                    <Txt color={COLOR.white}>Level {parentList.level}</Txt>
                    <Img
                        source={require('@images/vip/down.png')}
                        tintColor={colors.white}
                        width={15}
                        height={15}
                    />
                </Btn>
                {down &&
                    <Box
                        backgroundColor={colors.brown}
                        absolute
                        width={200}
                        top={45}
                    >
                        {levels.map((item) =>
                            <Item
                                key={item.value}
                                item={item}
                                onSetLevelParentList={handleSetLevelParentList}
                            />
                        )}
                    </Box>
                }
            </Box>
        </Box>
    )
}

const Item = ({ item, onSetLevelParentList }) => {
    return (
        <Btn
            onPress={() => onSetLevelParentList(item)}
            padding={10}
            alignCenter={false}
        >
            <Txt>
                {item.title}
            </Txt>
        </Btn>
    )
}

export default SelectLevel