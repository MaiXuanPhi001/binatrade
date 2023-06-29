import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import { ImageBackground } from 'react-native'
import Fire from './Fire'
import MoreInfomation from './MoreInfomation'
import Treasure from './Treasure'

const SteakChallenge = () => {
    return (
        <Box>
            <ImageBackground
                source={require('@images/prize/earth.png')}
                style={{ width: '100%', alignItems: 'center' }}
            >
                <Txt fontFamily={fonts.Frizon} marginTop={70} size={30}>
                    STEAK
                </Txt>
                <Txt fontFamily={fonts.Frizon} size={30}>
                    CHALLENGE
                </Txt>
                <Box>
                    <Fire />
                    <Treasure />
                    <MoreInfomation />
                </Box>
            </ImageBackground>
        </Box >
    )
}

export default SteakChallenge