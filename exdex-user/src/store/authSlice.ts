import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    tenxToken: string | null;
    countryCode: any[]
    email: string;
    otp: string;
    isMenuActive: boolean;
    planStatus: string;
    aiPlanStatus: boolean;
    dexPlanStatus: boolean;
    triggerGetPlans: boolean;
    hasFormSubmitted?:boolean
}

// CONTRACT_NOT_SIGNED  = "CONTRACT_NOT_SIGNED"
// 	PLAN_NOT_PURCHASED   = "PLAN_NOT_PURCHASED"
// 	CONTRACT_SIGNED      = "CONTRACT_SIGNED"

const initialState: AuthState = {
    user: null,
    token: null,
    tenxToken: null,
    countryCode: [],
    email: '',
    otp: '',
    isMenuActive: false,
    planStatus: "",
    aiPlanStatus: false,
    dexPlanStatus: false,
    triggerGetPlans: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            sessionStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        setTenxToken(state, action: PayloadAction<string>) {
            sessionStorage.setItem("tenxToken", action.payload);
            state.tenxToken = action.payload;
        },
        setPlanStatus(state, action: PayloadAction<string>) {
            sessionStorage.setItem("planStatus", action.payload);
            state.planStatus = action.payload;
        },
        setAiPlanStatus(state, action: PayloadAction<boolean>) {
            sessionStorage.setItem("aiPlanStatus", action.payload + '');
            state.aiPlanStatus = action.payload;
        },
        setDexPlanStatus(state, action: PayloadAction<boolean>) {
            sessionStorage.setItem("dexPlanStatus", action.payload + '');
            state.dexPlanStatus = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            sessionStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        },
        setHasFormSubmitted(state, action: PayloadAction<boolean>) {
            sessionStorage.setItem("form_submitted", JSON.stringify(action.payload));
            state.hasFormSubmitted = action.payload;
        },
        setCountryCodes(state, action) {
            state.countryCode = action.payload;
        },
        setEmailStore(state, action) {
            state.email = action.payload;
        },
        setOtpStore(state, action) {
            state.otp = action.payload;
        },
        setMenuActive(state, action) {
            state.isMenuActive = action.payload;
        },
        setTriggerGetPlan(state, action) {
            state.triggerGetPlans = action.payload;
        },
        clearUserAndToken(state) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('tenxToken');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('planStatus');
            sessionStorage.removeItem('aiPlanStatus');
            sessionStorage.removeItem('dexPlanStatus');
            sessionStorage.removeItem('form_submitted')
            state.user = null;
            state.token = null;
        },
    },
});

export const { setToken, setTenxToken, clearUserAndToken, setCountryCodes, setEmailStore, setOtpStore, setUser, setMenuActive, setPlanStatus, setAiPlanStatus, setDexPlanStatus, setTriggerGetPlan, setHasFormSubmitted } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectTenxToken = (state: { auth: AuthState }) => state.auth.tenxToken;
export const selectPlanStatus = (state: { auth: AuthState }) => state.auth.planStatus;
export const selectAiPlanStatus = (state: { auth: AuthState }) => state.auth.aiPlanStatus;
export const selectDexPlanStatus = (state: { auth: AuthState }) => state.auth.dexPlanStatus;
export const selectCountryCodes = (state: { auth: AuthState }) => state.auth.countryCode;
export const selectEmail = (state: { auth: AuthState }) => state.auth.email;
export const selectOtp = (state: { auth: AuthState }) => state.auth.otp;
export const selectMenuState = (state: { auth: AuthState }) => state.auth.isMenuActive;
export const selectTriggerPlans = (state: { auth: AuthState }) => state.auth.triggerGetPlans;
