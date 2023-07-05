import Box from '@commom/Box'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useSelector } from 'react-redux'
import Level from './Level'
import ReferralSponsor from './ReferralSponsor'
import Link from './Link'
import RecentStatistics from './RecentStatistics'

const General = () => {
    const COLOR = colors[useSelector(themeUserSelector)]

    return (
        <Box marginTop={15}>
            <Level />
            <ReferralSponsor />
            <Link />
            <RecentStatistics />
        </Box>
    )
}

export default General