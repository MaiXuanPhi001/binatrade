import Box from '@commom/Box'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
import { G, Line, Path, Svg, Text as TextSVG } from 'react-native-svg'
import { useSelector } from 'react-redux'

const LineAnimated = Animated.createAnimatedComponent(Line)

const LineChart = ({
    PADDING = 60,
    WIDTH_SVG = width - PADDING,
    HEIGH_SVG = 210,
    HEIGH_PATH = HEIGH_SVG - 40,
    WIDTH_PATH = WIDTH_SVG - 50,
    PADDING_LEFT = 20,
    PADDING_TOP = 20,
    data,
    inputRange,
    outputRange,
    indicator,
    pathVip,
    path,
    field = 'totalMember', 
    toFixed = 0
}) => {
    const COLOR = colors[useSelector(themeUserSelector)]
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
        referrals.value = data[index]?.[field] || 0
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
        return `${referrals?.value?.toFixed(toFixed)}`
    })

    const agenciesText = useDerivedValue(() => {
        return `${agencies?.value?.toFixed(toFixed)}`
    })
    const dayText = useDerivedValue(() => {
        const month = new Date().getMonth() + 1
        return `${day.value}/${month}`
    })

    return (
        <Box>
            <GestureHandlerRootView>
                <PanGestureHandler onGestureEvent={gestureEvent}>
                    <Animated.View style={{
                        borderWidth: 1,
                        borderColor: COLOR.border1,
                        borderRadius: 10,
                        backgroundColor: COLOR.backgroundColor,
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
                                            x={WIDTH_PATH + PADDING_LEFT + 10}
                                            y={y_point}
                                            fill={COLOR.white}
                                            fontWeight={'bold'}
                                            textAnchor={'start'}
                                        >
                                            {value.toFixed(toFixed)}
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
                                style={{ color: COLOR.white, fontWeight: 'bold' }}
                            />
                            <Box row alignCenter>
                                <Box radius={50} height={10} width={10} backgroundColor={colors.blueGreen} marginRight={5} />
                                <ReText
                                    text={referralsText}
                                    style={{ color: COLOR.white, fontWeight: 'bold' }}
                                />
                            </Box>
                            {pathVip &&
                                <Box row alignCenter>
                                    <Box radius={50} height={10} width={10} backgroundColor={colors.sky} marginRight={5} />
                                    <ReText
                                        text={agenciesText}
                                        style={{ color: COLOR.white, fontWeight: 'bold' }}
                                    />
                                </Box>}
                        </Box>
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </Box>
    )
}

export default LineChart