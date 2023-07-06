import Box from "@commom/Box"
import Header from "@reuse/Header"
import KeyBoardSafe from "@reuse/KeyBoardSafe"
import { screenChooseUserSelector, themeUserSelector } from "@selector/userSelector"
import userSlice from "@slice/userSlice"
import { colors } from "@theme/colors"
import routes from "@util/routes"
import { useEffect } from "react"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Chart from "./Chart"
import LastResult from "./LastResult"
import PlaceABet from "./PlaceABet"
import Profit from "./Profit"
import Symbol from "./Symbol"

const Trading = ({ navigation }) => {
    const dispatch = useDispatch()
    const screenChoose = useSelector(screenChooseUserSelector)
    const COLOR = colors[useSelector(themeUserSelector)]

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(userSlice.actions.setScreenChoose(routes.TRADING))
        });

        return unsubscribe;
    }, [])

    return (
        <Box
            flex={1}
            backgroundColor={COLOR.backgroundProfile}
            paddingBottom={20}
        >
            {screenChoose === routes.TRADING &&
                <>
                    <KeyBoardSafe paddingBottom={0} bg={COLOR.backgroundProfile}>
                        <Header navigation={navigation} />
                        <View style={{ paddingHorizontal: 5 }}>
                            <Symbol />
                            <Chart />
                            {/* <Controller /> */}
                            <LastResult />
                        </View>
                    </KeyBoardSafe>
                    <Box>
                        <Profit />
                        <PlaceABet />
                    </Box>
                </>
            }
        </Box>
    )
}

export default Trading