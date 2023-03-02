import React from 'react'
import LottieView from 'lottie-react-native';

const LottieAnimation = ({ source, size = 100 }) => {
    return (
        <LottieView
            style={[
                size && {width: size}
            ]}
            resizeMode="contain"
            autoSize
            source={source}
            autoPlay
            loop
        />
    )
}

export default LottieAnimation