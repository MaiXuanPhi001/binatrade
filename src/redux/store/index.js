import { configureStore } from "@reduxjs/toolkit";
import tradingSlice from "@slice/tradingSlice";
import userSlice from "../slice/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        trading: tradingSlice.reducer,
    }
})

export default store