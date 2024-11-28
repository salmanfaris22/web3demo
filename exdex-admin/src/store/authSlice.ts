import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    countryCode: any[]
    email: string;
    otp: string;
    permissions: [];
}

const initialState: AuthState = {
    user: null,
    token: null,
    countryCode: [],
    permissions: [],
    email: '',
    otp: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            sessionStorage.setItem("token", action.payload);
            state.token = action.payload;
        },
        setPermission(state, action: PayloadAction<any>) {
            sessionStorage.setItem("permissions", JSON.stringify(action.payload));
            state.permissions = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            sessionStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
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
        clearUserAndToken(state) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('permissions');
            sessionStorage.removeItem('user');
            state.user = null;
            state.token = null;
        },
    },
});

export const { setToken, clearUserAndToken, setCountryCodes, setEmailStore, setOtpStore, setUser, setPermission } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectPermissions = (state: { auth: AuthState }) => state.auth.permissions;
export const selectCountryCodes = (state: { auth: AuthState }) => state.auth.countryCode;
export const selectEmail = (state: { auth: AuthState }) => state.auth.email;
export const selectOtp = (state: { auth: AuthState }) => state.auth.otp;
