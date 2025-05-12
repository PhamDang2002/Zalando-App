import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDrawer: false,
  reset: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.isShowDrawer = !state.isShowDrawer;
    },
    triggerReset: (state) => {
      state.reset = !state.reset;
    },
  },
});

export const { toggleDrawer, triggerReset } = settingsSlice.actions;
export default settingsSlice.reducer;
