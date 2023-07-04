import Box from '@commom/Box'
import Txt from '@commom/Txt'
import ButtonUser from '@reuse/ButtonUser'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import Cell from './Cell'

const Vipmember = ({ navigation }) => {
    const COLOR = colors[useSelector(themeUserSelector)]

    const { t } = useTranslation()

    return (
        <KeyBoardSafe>
            <Header navigation={navigation} colorIcon={'white'} />
            <Box>
                <Image
                    source={require('@images/vip/bg-affiliate.png')}
                    style={{ opacity: 0.5}}
                />
                <Box absolute padding={20}>
                    <Txt bold size={16} marginTop={100}>
                        {t('You need to buy VIP license to receive VIP commissions and trading commissions')}
                    </Txt>
                    <ButtonUser
                        text={'Buy now $100'}
                        width={180}
                        height={45}
                        marginTop={20}
                    />
                    <Cell />
                    <Cell />
                </Box>
            </Box>
        </KeyBoardSafe>
    )
}

export default Vipmember