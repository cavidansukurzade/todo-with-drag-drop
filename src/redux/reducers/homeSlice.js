import { createSlice } from "@reduxjs/toolkit";
import { resetState } from "../reset";
import mockData from "../../mockData";

const initialState = {
  loading: false,
  tasks: mockData,
  inputValue: "",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export default homeSlice.reducer;
export const { setTasks, setInputValue } = homeSlice.actions;
