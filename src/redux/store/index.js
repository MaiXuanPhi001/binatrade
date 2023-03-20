import { configureStore } from "@reduxjs/toolkit";
import tradeSlice from "@slice/tradeSlice";
import userSlice from "../slice/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        trade: tradeSlice.reducer,
    }
})

export default store