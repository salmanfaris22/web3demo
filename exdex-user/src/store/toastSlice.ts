import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: { messages: <any>[] },
    reducers: {
        showToast: (state, action) => {
            const existingMessages = new Set(
                state.messages.map((item: any) => item.message)
            );
            if (!existingMessages.has(action.payload.message)) {
                state.messages.push(action.payload);
            }
        },
        removeToast: (state, action) => {
            state.messages = state.messages.filter(
                (message: any) => message.message !== action.payload
            );
        },
        hideToastById: (state, action) => {
            state.messages = state.messages.filter(
                (message: any) => message.id !== action.payload
            );
        },
    },
});

export const { showToast, removeToast, hideToastById } = toastSlice.actions;
export default toastSlice.reducer;
