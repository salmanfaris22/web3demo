import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OverviewState {
    callHistory: boolean,
    binaryMonthlyDetails: any,
    referralCodes: any
}

const initialState: OverviewState = {
    callHistory: false,
    binaryMonthlyDetails: {
        left_team_size: 0,
        left_volume: 0,
        left_volume_percentage_change: 0,
        right_team_size: 0,
        right_volume: 0,
        right_volume_percentage_change: 0,
    },
    referralCodes: {
        left_referral_code: "",
        right_referral_code: ""
    }
};

const overviewSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        setCallHistory(state, action) {
            state.callHistory = action.payload;
        },
        setBinaryMonthlyData(state, action) {
            state.binaryMonthlyDetails = action.payload;
        },
        setBinaryReferralData(state, action) {
            state.referralCodes = action.payload;
        }
    },
});

export const { setCallHistory, setBinaryMonthlyData, setBinaryReferralData } = overviewSlice.actions;
export default overviewSlice.reducer;

