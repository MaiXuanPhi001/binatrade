import Box from '@commom/Box'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import Level from './Level'
import ReferralSponsor from './ReferralSponsor'
import Link from './Link'
import RecentStatistics from './RecentStatistics'
import NetWorkVolStats from './NetWorkVolStats'

const General = () => {
    return (
        <Box marginTop={15}>
            <Level />
            <ReferralSponsor />
            <Link />
            <RecentStatistics />
            <NetWorkVolStats />
        </Box>
    )
}

export default General