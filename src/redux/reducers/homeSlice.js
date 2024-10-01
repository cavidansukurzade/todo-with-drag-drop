import { createSlice } from "@reduxjs/toolkit";
import { resetAllStates } from "../reset";
const initialState = {
  loading: false,
  inputs: {
    firstName: "",
    surName: "",
    user: "",
    users: [],
    date: new Date().toISOString(),
  },
};
export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setInputs: (state, action) => {
      state.inputs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllStates, () => initialState);
  },
});
export default homeSlice.reducer;
export const { setInputs } = homeSlice.actions;
