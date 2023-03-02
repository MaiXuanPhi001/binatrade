import { callSuccess } from "@method/requestResult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListUserF1, getParentToLevel, getProfile, login, turn2FA } from "@service/userService";
import contants from "@util/contants";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const loginThunk = createAsyncThunk('user/login', async (data) => {
    const res = await login(data)
    if (!res.error && res.status) {
        console.log(res.data.token)
        await AsyncStorage.setItem(contants.TOKEN, res.data.token)
        const response = await getProfile()
        return response
    }
    return res
})

export const getProfileThunk = createAsyncThunk('user/getProfile', async () => {
    const res = await getProfile()
    return res
})

export const getListUserF1Thunk = createAsyncThunk('account/getListUserF1', async (data) => {
    const res = await getListUserF1(data)
    return { ...res, page: data.page }
})

export const getParentToLevelThunk = createAsyncThunk('account/getParentToLevel', async (data) => {
    const res = await getParentToLevel(data)
    return { ...res, level: data.level }
})

export const turn2FAThunk = createAsyncThunk('user/turn2FA', async (otp) => {
    const res = await turn2FA(otp)
    if (!res.error && res.status) {
        const response = await getProfile()
        return callSuccess(response)
    }
    return res
})