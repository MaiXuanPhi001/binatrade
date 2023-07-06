import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { themeUserSelector } from '@selector/userSelector'
import { getChartStatisticsUser } from '@service/fundingService'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { useEffect, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
import { G, Line, Path, Svg, Text as TextSVG } from 'react-native-svg'
import { useSelector } from 'react-redux'

const PADDING = 60
const WIDTH_SVG = width - PADDING
const HEIGH_SVG = 210
const HEIGH_PATH = HEIGH_SVG - 40
const WIDTH_PATH = WIDTH_SVG - 50
const PADDING_LEFT = 20
const PADDING_TOP = 20

// const DB = [
//     {
//         "totalMember": 10,
//         "totalMemberVipF1": 0,
//     },
//     {
//         "totalMember": 8,
//         "totalMemberVipF1": 0,
//     },
//     {
//         "totalMember": 5,
//         "totalMemberVipF1": 0,
//     },
//     {
//         "totalMember": 0,
//         "totalMemberVipF1": 11,
//     },
//     {
//         "totalMember": 0,
//         "totalMemberVipF1": 5,
//     },
//     {
//         "totalMember": 0,
//         "totalMemberVipF1": 4,
//     },
//     {
//         "totalMember": 0,
//         "totalMemberVipF1": 6,
//     }
// ]

const LineAnimated = Animated.createAnimatedComponent(Line)

const ThisMonth = () => {
    const COLOR = colors[useSelector(themeUserSelector)]
    const [data, setData] = useState([])
    const [inputRange, setInputRange] = useState([0, 1])
    const [outputRange, setOutputRange] = useState([0, 1])
    const [path, setPath] = useState('')
    const [pathVip, setPathVip] = useState('')
    const [indicator, setIndicator] = useState({
        min: 0, max: 0, height: 0, totalMember: 0, totalMemberVipF1: 0
    })

    useEffect(() => {
        handleGetChartStatisticsUser()
    }, [])

    const handleGetChartStatisticsUser = async () => {
        let dateNow = new Date()
        let start = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getTime()
        let end = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getTime()

        const res = await getChartStatisticsUser({
            start,
            end,
        })

        if (res.status) {
            let max = Number.MIN_SAFE_INTEGER
            let min = Number.MAX_SAFE_INTEGER
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].totalMember > max) max = res.data[i].totalMember
                if (res.data[i].totalMemberVipF1 > max) max = res.data[i].totalMemberVipF1

                if (res.data[i].totalMember < min) min = res.data[i].totalMember
                if (res.data[i].totalMemberVipF1 < min) min = res.data[i].totalMemberVipF1
            }

            const height = max - min

            let section = 0
            if (height !== 0) {
                section = HEIGH_PATH / height
            }

            let dPath = ''
            let dPathVip = ''
            let range = []
            let inputRange = []
            let outputRange = []
            let totalMember = 0
            let totalMemberVipF1 = 0

            res.data.map((item, index) => {
                const x_point = (WIDTH_PATH / (res.data.length - 1) * index) + PADDING_LEFT
                const y_point = (HEIGH_PATH - ((item.totalMember - min) * section)) + PADDING_TOP
                const y_point_vip = (HEIGH_PATH - ((item.totalMemberVipF1 - min) * section)) + PADDING_TOP

                range.push((WIDTH_PATH / (res.data.length - 1) * index))

                totalMember += item.totalMember
                totalMemberVipF1 += item.totalMemberVipF1

                if (index === 0) {
                    dPath += `M${x_point} ${y_point}`
                    dPathVip += `M${x_point} ${y_point_vip}`
                } else {
                    dPath += `L${x_point} ${y_point}`
                    dPathVip += `L${x_point} ${y_point_vip}`
                }
            })

            for (let i = 0; i < range.length; i++) {
                if (i === 0) inputRange.push(range[i])

                if (i !== 0) {
                    const tb = (range[i] - range[i - 1]) / 2 + range[i - 1]
                    inputRange = [...inputRange, (tb - 0.1), (tb + 0.1), range[i]]
                }

                if (i !== 0 && i < (range.length - 1)) {
                    outputRange = [...outputRange, range[i], range[i], range[i]]
                } else {
                    outputRange = [...outputRange, range[i], range[i]]
                }
            }

            setInputRange(inputRange)
            setOutputRange(outputRange)
            setPathVip(dPathVip)
            setPath(dPath)
            setData(res.data)
            setIndicator({ max, min, height, totalMember, totalMemberVipF1 })
        }
    }

    const positionX = useSharedValue(0)
    const opacity = useSharedValue(0)
    const day = useSharedValue(1)
    const referrals = useSharedValue(0)
    const agencies = useSharedValue(0)

    const gestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.translateX = positionX.value
            opacity.value = 1
        },
        onActive: (e, ctx) => {
            const translateX = e.translationX + ctx.translateX
            if (translateX > WIDTH_PATH) {
                positionX.value = WIDTH_PATH
            } else if (translateX < 0) {
                positionX.value = 0
            } else {
                positionX.value = translateX
            }
        },
        onEnd: (e, ctx) => {
            opacity.value = 0
        }
    })

    const cursorStyle = useAnimatedStyle(() => {
        const local = interpolate(
            positionX.value,
            inputRange,
            outputRange,
            {
                extrapolateLeft: Extrapolation.IDENTITY,
                extrapolateRight: Extrapolation.IDENTITY,
            }
        )
        const index = (local / (WIDTH_PATH / (data.length - 1))).toFixed(0)
        day.value = new Date(data[index]?.created_at).getDate() || 1
        referrals.value = data[index]?.totalMember || 0
        agencies.value = data[index]?.totalMemberVipF1 || 0

        return {
            transform: [
                {
                    translateX: local,
                },
            ],
            opacity: opacity.value
        }
    })

    const referralsText = useDerivedValue(() => {
        return `${referrals.value}`
    })

    const agenciesText = useDerivedValue(() => {
        return `${agencies.value}`
    })
    const dayText = useDerivedValue(() => {
        const month = new Date().getMonth() + 1
        return `${day.value}/${month}`
    })

    return (
        <Box>
            <Txt size={15} color={colors.blueGreen} bold>
                Total new referrals({indicator.totalMember})
            </Txt>
            <Txt size={15} bold color={colors.sky} marginVertical={10}>
                Total new agencies({indicator.totalMemberVipF1})
            </Txt>

            <GestureHandlerRootView>
                <PanGestureHandler onGestureEvent={gestureEvent}>
                    <Animated.View style={{
                        borderWidth: 1,
                        borderColor: COLOR.border1,
                        borderRadius: 10,
                        backgroundColor: '#011022',
                    }}>
                        <Svg
                            width={WIDTH_SVG}
                            height={HEIGH_SVG}
                        >
                            <Path
                                key={'Path_This_Month'}
                                d={path}
                                strokeWidth={3}
                                stroke={colors.blueGreen}
                                fill={'none'}
                            />
                            <Path
                                key={'Path_This_Month_Vip'}
                                d={pathVip}
                                strokeWidth={3}
                                stroke={colors.sky}
                                fill={'none'}
                            />
                            {Array.from(new Array(3)).map((item, index) => {
                                const x_point = (WIDTH_PATH / (2) * index) + PADDING_LEFT

                                return (
                                    <G key={`G_${index}`}>
                                        <Line
                                            key={`L_X_${index}`}
                                            x1={x_point}
                                            y1={0}
                                            x2={x_point}
                                            y2={HEIGH_PATH + PADDING_TOP}
                                            stroke={colors.line}
                                            strokeWidth={0.5}
                                        />
                                    </G>
                                )
                            })}

                            {Array.from(new Array(6)).map((item, index) => {
                                const y_point = (HEIGH_PATH - (HEIGH_PATH / (5) * index)) + PADDING_TOP
                                const value = indicator.max / 5 * index

                                return (
                                    <G key={`G_T${index}`}>
                                        <TextSVG
                                            x={WIDTH_SVG - 20}
                                            y={y_point}
                                            fill={'white'}
                                            fontWeight={'bold'}
                                        >
                                            {value.toFixed(0)}
                                        </TextSVG>
                                    </G>
                                )
                            })}

                            <LineAnimated
                                key={`L_Cursor`}
                                x1={PADDING_LEFT}
                                y1={0}
                                x2={PADDING_LEFT}
                                y2={HEIGH_PATH + PADDING_TOP}
                                stroke={colors.yellow}
                                strokeWidth={2}
                                style={cursorStyle}
                            />
                        </Svg>
                        <Box row alignCenter justifySpaceBetween marginBottom={10} paddingHorizontal={10}>
                            <ReText
                                text={dayText}
                                style={{ color: "white", fontWeight: 'bold' }}
                            />
                            <Box row alignCenter>
                                <Box radius={50} height={10} width={10} backgroundColor={colors.blueGreen} marginRight={5} />
                                <ReText
                                    text={referralsText}
                                    style={{ color: "white", fontWeight: 'bold' }}
                                />
                            </Box>
                            <Box row alignCenter>
                                <Box radius={50} height={10} width={10} backgroundColor={colors.sky} marginRight={5} />
                                <ReText
                                    text={agenciesText}
                                    style={{ color: "white", fontWeight: 'bold' }}
                                />
                            </Box>
                        </Box>
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </Box>
    )
}

export default ThisMonth