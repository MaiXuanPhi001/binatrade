import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfileMegaPoolAfter } from "@service/fundingService";
import { checKYCUser, getListUserF1, getParentToLevel, getProfile, getValueConfig, login } from "@service/userService";
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

export const getValueConfigThunk = createAsyncThunk('user/getValueConfig', async (name) => {
    const res = await getValueConfig(name)
    return res
})

export const checKYCUserThunk = createAsyncThunk('user/checKYCUser', async () => {
    const res = await checKYCUser()
    return res
})

export const getProfileMegaPoolAfterThunk = createAsyncThunk('user/getProfileMegaPoolAfter', async () => {
    const res = await getProfileMegaPoolAfter()
    return res
})