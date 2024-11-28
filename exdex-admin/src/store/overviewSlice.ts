import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OverviewState {
    filter: string
    spendSummary: any
}

const initialState: OverviewState = {
    filter: 'all',
    spendSummary: {
        total_excoin_spent: 0,
        total_dexcoin_spent: 0,
        excoin_balance: 0,
        dexcoin_balance: 0,
        excoin_spend_change: 0,
        dexcoin_spend_change: 0,
        dextoken_balance_change: 0,
        excoin_balance_change: 0,
        excoin_spend_graph: [],
        dexcoin_spend_graph: [],
        excoin_balance_graph: [],
        dexcoin_balance_graph: [],
    }
};

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<any>) {
            state.filter = action.payload;
        },
        setSpendSummary(state, action: PayloadAction<any>) {
            state.spendSummary = action.payload;
        }

    },
});

export const { setFilter, setSpendSummary } = overviewSlice.actions;
export default overviewSlice.reducer;

export const selectFilter = (state: { overview: OverviewState }) => state.overview.filter;
export const selectSpendSummary = (state: { overview: OverviewState }) => state.overview.spendSummary;
