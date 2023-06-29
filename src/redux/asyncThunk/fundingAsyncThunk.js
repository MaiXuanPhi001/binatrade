import { createAsyncThunk } from "@reduxjs/toolkit"
import { getListStreak } from "@service/fundingService"

export const getListStreakThunk =
    createAsyncThunk('funding/getListStreak', async (data) => {
        const res = await getListStreak(data)
        return { ...res, page: data.page }
    })