import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState: ApiState = {
    loading: false,
    data: null,
    error: null,
};

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        apiCallStart(state) {
            state.loading = true;
            state.error = null;
        },
        apiCallSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.data = action.payload;
        },
        apiCallFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    apiCallStart,
    apiCallSuccess,
    apiCallFailure,
} = apiSlice.actions;

export default apiSlice.reducer;
