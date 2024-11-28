import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PackageState {
    selectedPackage: any
}

const initialState: PackageState = {
    selectedPackage: {},
};

const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        setSelectedPackage(state, action) {
            state.selectedPackage = action.payload;
        }
    },
});

export const { setSelectedPackage } = packageSlice.actions;
export default packageSlice.reducer;

export const getSelectedPackage = (state: PackageState) => state.selectedPackage;
