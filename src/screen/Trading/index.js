import Header from "@reuse/Header"
import KeyBoardSafe from "@reuse/KeyBoardSafe"
import { screenChooseUserSelector } from "@selector/userSelector"
import Symbol from "./Symbol"
import { useSelector } from "react-redux"
import routes from "@util/routes"
import { View } from "react-native"
import Chart from "./Chart"

const Trading = ({ navigation }) => {
    const screenChoose = useSelector(screenChooseUserSelector)

    return (
        <KeyBoardSafe paddingBottom={0}>
            <Header navigation={navigation} />
            {screenChoose === routes.TRADE &&
                <View style={{ paddingHorizontal: 5 }}>
                    <Symbol />
                    <Chart />
                </View>
            }
        </KeyBoardSafe>
    )
}

export default Trading