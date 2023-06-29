import { createSlice } from "@reduxjs/toolkit";
import contants from "@util/contants";
import routes from "@util/routes";
import { checKYCUserThunk, getProfileMegaPoolAfterThunk, getProfileThunk, getValueConfigThunk, loginThunk } from "../asyncThunk/userAsyncThunk";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        profile: {},
        loading: false,
        sound: true,
        screenChoose: routes.TRADING,
        type: 'live',
        prizePool: [],
        kyc: '',
        lastWinner: {
            megaPoolAfter: 0,
            userNameMegaPool: ''
        }
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
        },
        setScreenChoose: (state, { payload }) => {
            state.screenChoose = payload
        },
        changeType: (state, { payload }) => {
            state.type = payload
        },
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
            })
            .addCase(getValueConfigThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.prizePool = payload.data
                }
            })
            .addCase(checKYCUserThunk.fulfilled, (state, { payload }) => {
                if (!payload.error) {
                    if (payload.status) {
                        state.kyc = payload.data
                    } else {
                        state.kyc = contants.NOT_KYC
                    }
                }
            })
            .addCase(getProfileMegaPoolAfterThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.lastWinner = payload.data
                }
            })
    }
})

export default userSlice