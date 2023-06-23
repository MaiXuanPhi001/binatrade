import { configureStore } from "@reduxjs/toolkit";
import tradeSlice from "@slice/tradeSlice";
import userSlice from "../slice/userSlice";
import tradingSlice from "@slice/tradingSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        trade: tradeSlice.reducer,
        trading: tradingSlice.reducer,
    }
})

export default store