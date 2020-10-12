import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    loading: false,
  },
  reducers: {
    loadingStopped: (state) => {
      state.loading = false;
    },
    loadingStarted: (state) => {
      state.loading = true;
    },
  },
});

export const { loadingStopped, loadingStarted } = statusSlice.actions;

export default statusSlice.reducer;