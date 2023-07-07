import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { getChartStatisticsUser } from '@service/fundingService'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { useEffect, useState } from 'react'
import LineChart from './LineChart'

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

const ThisMonth = () => {
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

    return (
        <Box>
            <Txt size={15} color={colors.blueGreen} bold>
                Total new referrals({indicator.totalMember})
            </Txt>
            <Txt size={15} bold color={colors.sky} marginVertical={10}>
                Total new agencies({indicator.totalMemberVipF1})
            </Txt>

            <LineChart
                {...{
                    data,
                    inputRange,
                    outputRange,
                    indicator,
                    pathVip,
                    path,
                }}
            />
        </Box>
    )
}

export default ThisMonth