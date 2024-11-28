import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
  name: string;
  ID: number;
  card_type : 1 | "2"
}

interface HelpCenterState {
  categories: ICategory[];
}

const initialState: HelpCenterState = {
  categories: []
};

const helpCenterSlice = createSlice({
  name: 'helpCenter',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = helpCenterSlice.actions;
export default helpCenterSlice.reducer;


export const selectCategories = (state: { helpCenter: HelpCenterState }) => state.helpCenter.categories;
