import { colors } from '@theme/colors'
import { View } from 'react-native'

const DotItem = ({ color, marginEnable }) => {
    return (
        <View
            style={
                {
                    backgroundColor: colors.gray5,
                    marginRight: marginEnable ? 10 : 0,
                    width: 15,
                    height: 15,
                    borderRadius: 50,
                    margin: 2,
                }
            }
        />
    )
}

export default DotItem