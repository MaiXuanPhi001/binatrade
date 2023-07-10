import { createSlice } from "@reduxjs/toolkit";
import contants from "@util/contants";
import routes from "@util/routes";
import { checKYCUserThunk, getListNotificationThunk, getProfileMegaPoolAfterThunk, getProfileThunk, getValueConfigThunk, loginThunk } from "../asyncThunk/userAsyncThunk";
import i18next from "i18next";
import { numberCommasDot } from "@method/format";

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
            userNameMegaPool: '',
        },
        theme: 'dark',
        notifications: {
            data: [],
            watched: 0,
            total: 0,
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
        setSetting: (state, { payload }) => {
            state.sound = payload.sound
            state.theme = payload.theme
        },
        setScreenChoose: (state, { payload }) => {
            state.screenChoose = payload
        },
        changeType: (state, { payload }) => {
            state.type = payload
        },
        setTheme: (state, { payload }) => {
            state.theme = payload
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
            .addCase(getListNotificationThunk.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    if (i18next.language === 'en') {
                        state.notifications.data = payload.data.array
                    } else {
                        convertDetailByLangue(state, payload.data.array)
                    }
                    state.notifications.total = payload.data.total
                    state.notifications.watched = payload.data.total - payload.data.watched
                }
            })
    }
})

const convertDetailByLangue = (state, array) => {
    if (i18next.language === 'vn') {
        state.notifications.data = array.map((item, index) => {
            let detail = ''
            if (item.type === 0) detail = `Thành viên cấp dưới của bạn vừa trở thành VIP. Bạn nhận được $${item.amountRoseMemberVip} tiền hoa hồng`
            if (item.type === 3) detail = `Bạn nhận thành công $${numberCommasDot(item.amountCommission.toFixed(2))} hoa hồng từ giao dịch vào ngày ${item.timeCommission}`
            if (item.type === 4) detail = `Người nhận: ${item.userNameTransfer}\nSố tiền: $${numberCommasDot(item.amountTransfer.toFixed(2))}\nMemo: ${item.memo}`
            if (item.type === 6) detail = `Bạn đã nạp $${numberCommasDot(item.amountDeposit.toFixed(2))}`
            // if (item.type === 7) detail = ``
            return { ...item, detail }
        })
    }
}

export default userSlice