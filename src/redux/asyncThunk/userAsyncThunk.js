import AsyncStorage from "@react-native-async-storage/async-storage";
import { getListUserF1, getParentToLevel, getProfile, getValueConfig, login } from "@service/userService";
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