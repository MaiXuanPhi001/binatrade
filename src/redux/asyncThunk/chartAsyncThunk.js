import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChart } from "@service/chartService";

export const getChartThunk = createAsyncThunk('chart/getChart', async (symbol) => {
    const res = await getChart(symbol)
    return res
})