import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import TextError from '@reuse/TextError'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { theme } from '@theme/index'
import { useSelector } from 'react-redux'
const HEIGH = 40

const AmountUSDT = ({ amount, setAmount, t, profile, checkForm }) => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box marginBottom={10} marginTop={10}>
            <Txt color={COLOR.white}>
                {t('Amount of USDT')}
            </Txt>
            <Box
                row
                height={HEIGH}
                marginTop={5}
            >
                <Box
                    flex={1}
                    row
                    height={HEIGH}
                    borderWidth={1}
                    borderColor={COLOR.border2}
                    radius={5}
                >
                    <Box flex={1}>
                        <Input
                            value={amount}
                            onChangeText={setAmount}
                            color={COLOR.white}
                            keyboardType={'number-pad'}
                            height={HEIGH}
                            paddingHorizontal={10}
                        />
                    </Box>

                    <Box
                        height={HEIGH}
                        alignCenter
                        justifyCenter
                        backgroundColor={COLOR.blue}
                        width={50}
                    >
                        <Txt>USDT</Txt>
                    </Box>
                </Box>

                <Btn
                    onPress={() => setAmount(profile.balance.toFixed(0))}
                    height={HEIGH}
                    alignCenter
                    justifyCenter
                    width={60}
                    borderWidth={1}
                    borderColor={COLOR.border2}
                    radius={5}
                    marginLeft={10}
                >
                    <Txt color={COLOR.white}>{t('MAX')}</Txt>
                </Btn>
            </Box>
            {(checkForm && amount.trim() === '') && <TextError text={t('Amount is empty')} />}
        </Box>
    )
}

export default AmountUSDT