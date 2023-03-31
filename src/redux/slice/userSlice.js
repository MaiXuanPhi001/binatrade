import { createSlice } from "@reduxjs/toolkit";
import routes from "@util/routes";
import { getProfileThunk, getValueConfigThunk, loginThunk } from "../asyncThunk/userAsyncThunk";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        profile: {},
        loading: false,
        sound: true,
        screenChoose: routes.TRADE,
        type: 'live',
        prizePool: [],
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
    }
})

export default userSlice