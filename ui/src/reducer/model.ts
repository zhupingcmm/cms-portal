import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "modelReducer",
  initialState: {
    status: false,
  },
  reducers: {
    open: (state) => {
      state.status = true;
    },
    close: (state) => {
      state.status = false;
    },
  },
});
export const { open, close } = modelSlice.actions;
export default modelSlice.reducer;
