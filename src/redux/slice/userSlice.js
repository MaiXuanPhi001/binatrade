import { createSlice } from "@reduxjs/toolkit";
import { getProfileThunk, loginThunk, turn2FAThunk } from "../asyncThunk/userAsyncThunk";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        profile: {},
        loading: false,
        sound: true,
    },
    reducers: {
        signOut: (state) => {
            state.profile = {}
            state.isLogin = false
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSound: (state, { payload }) => {
            state.sound = payload
        }
    },
    extraReducers: buidlder => {
        buidlder
            .addCase(loginThunk.pending, (state, action) => {
                state.loading = true
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.status) {
                    state.isLogin = true
                    state.profile = action.payload.data
                }
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.isLogin = true
                    state.profile = action.payload.data
                }
            }).
            addCase(turn2FAThunk.fulfilled, (state, action) => {
                if (!action.payload.error && action.payload.status) {
                    state.profile = action.payload.data
                }
            })
    }
})

export default userSlice