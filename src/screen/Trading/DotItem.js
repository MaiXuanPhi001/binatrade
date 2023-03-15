import { View } from 'react-native'

const DotItem = ({ color, marginEnable }) => {
    return (
        <View
            style={
                {
                    backgroundColor: color,
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