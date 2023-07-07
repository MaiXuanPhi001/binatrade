import { useNavigation } from '@react-navigation/native'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TabVip from './TabVip'
import Box from '@commom/Box'
import General from './General'
import Commission from './Commission'
import NetworkManager from './NetworkManager'

const Vip = () => {
    const navigation = useNavigation()
    const COLOR = colors[useSelector(themeUserSelector)]
    const [tab, setTab] = useState('general')

    return (
        <KeyBoardSafe paddingBottom={0} bg={COLOR.backgroundProfile}>
            <Header navigation={navigation} colorIcon={'white'} />
            <Box paddingHorizontal={10}>
                <TabVip {...{ tab, setTab }} />
                {tab === 'general' ?
                    <General /> : tab === 'commission' ?
                        <Commission /> : <NetworkManager />
                }
            </Box>
        </KeyBoardSafe>
    )
}

export default Vip