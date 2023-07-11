import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { useTranslation } from 'react-i18next'
import * as Progress from 'react-native-progress'
import { useSelector } from 'react-redux'

const Profit = ({ data }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]

    let [buyPercent, sellPercent] = [0, 0]
    const total = data.totalBuy + data.totalSell
    if (total != 0) {
        buyPercent = data.totalBuy * 100 / total
        sellPercent = data.totalSell * 100 / total
    }

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            marginTop={20}
            alignCenter
        >
            <Box
                backgroundColor={colors.sky}
                row
                padding={10}
                alignCenter
                justifyCenter
                radius={10}
                width={'100%'}
            >
                <Img
                    source={require('@images/dashboard/data-report.png')}
                    width={27}
                    height={27}
                    tintColor={colors.white}
                    marginRight={20}
                />
                <Box>
                    <Txt bold size={17}>{t('Net Profit')}</Txt>
                    <Txt bold size={17} marginTop={5}>{t(`$ ${data.totalAmountWin - data.totalAmountLose}`)}</Txt>
                </Box>
            </Box>

            <Box
                backgroundColor={colors.greenCan}
                row
                padding={10}
                alignCenter
                justifyCenter
                radius={10}
                marginTop={10}
                width={'100%'}
            >
                <Img
                    source={require('@images/dashboard/money.png')}
                    width={27}
                    height={27}
                    tintColor={colors.white}
                    marginRight={20}
                />
                <Box>
                    <Txt bold size={17}>{t('Total Revenue')}</Txt>
                    <Txt bold size={17} marginTop={5}>{t(`$ ${data.totalOrder}`)}</Txt>
                </Box>
            </Box>

            <Txt size={18} bold color={COLOR.white} marginVertical={20}>Trade summary</Txt>
            {total === 0 ?
                <Progress.Bar
                    progress={0}
                    height={8}
                    width={width - 60}
                    color={COLOR.border1}
                    unfilledColor={COLOR.border1}
                    borderColor={COLOR.border1}
                /> :
                <Progress.Bar
                    progress={buyPercent / 100}
                    height={8}
                    width={width - 60}
                    color={colors.greenCan}
                    unfilledColor={colors.redCan}
                    borderColor={COLOR.backgroundProfile}
                />
            }

            <Box row justifySpaceBetween width={'100%'} marginTop={10}>
                <Txt bold color={colors.green}>{t('Buy')} {buyPercent}%</Txt>
                <Txt bold color={colors.red}>{sellPercent}% {t('Sell')}</Txt>
            </Box>
        </Box>
    )
}

export default Profit