import { Animated } from "react-native";

export const animateToast = (slideAnim) => {
    Animated.timing(slideAnim, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
    }).start();

    setTimeout(() => {
        Animated.timing(slideAnim, {
            toValue: -120,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, 2500);
};