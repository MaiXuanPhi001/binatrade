import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "@slice/accountSlice";
import adminSlice from "@slice/adminSlice";
import chartSlice from "@slice/chartSlice";
import commissionSlice from "@slice/commissionSlice";
import fundingSlice from "@slice/fundingSlice";
import historySlice from "@slice/historySlice";
import orderSlice from "@slice/orderSlice";
import statisticSlice from "@slice/statisticSlice";
import tradeSlice from "@slice/tradeSlice";
import userSlice from "../slice/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        chart: chartSlice.reducer,
        order: orderSlice.reducer,
        statistic: statisticSlice.reducer,
        history: historySlice.reducer,
        funding: fundingSlice.reducer,
        account: accountSlice.reducer,
        admin: adminSlice.reducer,
        commission: commissionSlice.reducer,
        trade: tradeSlice.reducer,
    }
})

export default store