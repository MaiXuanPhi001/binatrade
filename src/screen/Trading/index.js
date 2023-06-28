import Box from "@commom/Box"
import Header from "@reuse/Header"
import KeyBoardSafe from "@reuse/KeyBoardSafe"
import { screenChooseUserSelector } from "@selector/userSelector"
import userSlice from "@slice/userSlice"
import { theme } from "@theme/index"
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(userSlice.actions.setScreenChoose(routes.TRADING))
        });

        return unsubscribe;
    }, [])

    return (
        <Box flex={1} backgroundColor={theme.colors.background} paddingBottom={20}>
            {screenChoose === routes.TRADING &&
                <>
                    <KeyBoardSafe paddingBottom={0}>
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