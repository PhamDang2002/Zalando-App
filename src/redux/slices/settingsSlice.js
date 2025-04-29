import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDrawer: true,
  reset: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isShowDrawer = !state.isShowDrawer;
    },
    resetAlls: (state, action) => {
      state.reset = action.payload;
    },
  },
});

export const { toggleDrawer, resetAlls } = settingsSlice.actions;
export default settingsSlice.reducer;
