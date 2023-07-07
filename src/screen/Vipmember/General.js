import Box from '@commom/Box'
import Level from './Level'
import Link from './Link'
import NetWorkVolStats from './NetWorkVolStats'
import RecentStatistics from './RecentStatistics'
import ReferralSponsor from './ReferralSponsor'
import Support from './Support'

const General = () => {
    return (
        <Box marginTop={15}>
            <Level />
            <ReferralSponsor />
            <Link />
            <RecentStatistics />
            <NetWorkVolStats />
            <Support />
        </Box>
    )
}

export default General