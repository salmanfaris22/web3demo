import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadState {
    discover: number
}

const initialState: LoadState = {
    discover: 0,
};

const loadSlice = createSlice({
    name: 'load',
    initialState,
    reducers: {
        setLoad(state, action: PayloadAction<any>) {
            state.discover = action.payload > state.discover ? action.payload : state.discover;
        },

    },
});

export const { setLoad } = loadSlice.actions;
export default loadSlice.reducer;

export const selectDiscoverLoad = (state: { load: LoadState }) => state.load.discover;
