import { configureStore } from "@reduxjs/toolkit";
import tradingSlice from "@slice/tradingSlice";
import userSlice from "../slice/userSlice";
import fundingSlice from "@slice/fundingSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        trading: tradingSlice.reducer,
        funding: fundingSlice.reducer,
    }
})

export default store