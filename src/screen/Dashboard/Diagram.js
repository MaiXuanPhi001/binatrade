import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import PieChart from 'react-native-pie-chart'
import { useSelector } from 'react-redux'

const sizeText = 16

const Diagram = ({ data }) => {
    const { t } = useTranslation()
    const COLOR = colors[useSelector(themeUserSelector)]

    const widthAndHeight = 150
    const series = [data.totalWin, data.totalLose, data.totalDraw]
    const sliceColor = [colors.greenCan, colors.redCan, COLOR.border1]

    const totaTrade = data.totalWin + data.totalLose + data.totalDraw

    return (
        <Box
            borderWidth={1}
            borderColor={COLOR.border1}
            radius={10}
            padding={20}
            alignCenter
        >
            <Txt size={sizeText} bold marginBottom={20} color={COLOR.white}>
                {t('Trade Stats')}
            </Txt>
            {totaTrade !== 0 &&
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    coverRadius={0.5}
                />
            }
            <Box marginTop={30} row marginBottom={20}>
                <Box row alignCenter>
                    <Box backgroundColor={colors.green} width={15} height={15} radius={50} />
                    <Txt color={COLOR.white} marginLeft={5} bold>
                        {t('Win')}
                    </Txt>
                </Box>
                <Box row alignCenter marginHorizontal={20}>
                    <Box backgroundColor={COLOR.border1} width={15} height={15} radius={50} />
                    <Txt color={COLOR.white} marginLeft={5} bold>
                        {t('Draw')}
                    </Txt>
                </Box>
                <Box row alignCenter>
                    <Box backgroundColor={colors.redCan} width={15} height={15} radius={50} />
                    <Txt color={COLOR.white} marginLeft={5} bold>
                        {t('Lose')}
                    </Txt>
                </Box>
            </Box>

            <Txt style={[styles.textTitle, { color: COLOR.white }]}>
                {t('Total trade')}
            </Txt>
            <Txt style={[styles.textValue, { color: COLOR.white }]}>
                {totaTrade}
            </Txt>
            <Txt style={[styles.textTitle, { color: COLOR.white }]}>
                {t('Total win round')}
            </Txt>
            <Txt style={[styles.textValue, { color: COLOR.white }]}>
                {data.totalWin}
            </Txt>
            <Txt style={[styles.textTitle, { color: COLOR.white }]}>
                {t('Total rate')}
            </Txt>
            <Txt style={[styles.textValue, { color: COLOR.white }]}>
                {totaTrade === 0 ? totaTrade : data.totalWin / totaTrade}%
            </Txt>
        </Box>
    )
}

export default Diagram

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 17,
        marginBottom: 5,
    },
    textValue: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    }
})