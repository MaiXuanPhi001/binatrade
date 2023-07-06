import { profileSelector } from '@selector/userSelector'
import { useSelector } from 'react-redux'
import BuyVip from './BuyVip'
import Vip from './Vip'

const Vipmember = () => {
    const profile = useSelector(profileSelector)

    return (
        <>
            {profile.level === 0 ?
                <BuyVip /> :
                <Vip />
            }
        </>
    )
}

export default Vipmember