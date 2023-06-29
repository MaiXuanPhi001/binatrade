import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'

const SIZE_TEXT = 17

const TabHistory = ({ tab, setTab }) => {
    return (
        <Box
            row
            alignCenter
            marginTop={30}
            borderBottomWidth={1}
            borderColor={'#292b34'}
        >
            <Btn
                onPress={() => setTab('winning')}
                marginRight={20}
                borderBottomWidth={tab === 'winning' ? 2 : 0}
                borderColor={colors.sky}
                paddingVertical={10}
            >
                <Txt
                    size={SIZE_TEXT}
                    bold
                    color={tab === 'winning' ? colors.sky : colors.white}
                >
                    Winning History
                </Txt>
            </Btn>

            <Btn
                onPress={() => setTab('your')}
                marginRight={20}
                borderBottomWidth={tab === 'your' ? 2 : 0}
                borderColor={colors.sky}
                paddingVertical={10}
            >
                <Txt
                    size={SIZE_TEXT}
                    bold
                    color={tab === 'your' ? colors.sky : colors.white}
                >
                    Your history
                </Txt>
            </Btn>
        </Box>
    )
}

export default TabHistory