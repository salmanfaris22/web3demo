import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    filter: string
}

const initialState: UserState = {
    filter: 'online',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<any>) {
            state.filter = action.payload;
        },

    },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;

export const selectFilter = (state: { user: UserState }) => state.user.filter;
