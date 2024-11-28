import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../pages/HelpCenter/HelpCenter";

interface HelpCenterState {
  categories: Category[];
}

const initialState: HelpCenterState = {
  categories: [],
};

const helpCenterSlice = createSlice({
  name: "helpCenter",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = helpCenterSlice.actions;
export default helpCenterSlice.reducer;

export const selectCategories = (state: { helpCenter: HelpCenterState }) => {
  return state?.helpCenter?.categories;
};
