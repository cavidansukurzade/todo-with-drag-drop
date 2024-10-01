// import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginRequest = createAsyncThunk(
  "auth/LoginRequest",
  async (data, thunkApi) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!(data.userName == "cavidan" && data.password == 123)) {
        return false;
      }
      const responseData = "randomgeneratedtoken";
      localStorage.setItem("token", responseData);
      return true;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
export const CheckAuth = createAsyncThunk(
  "auth/CheckAuth",
  async (_, thunkApi) => {
    try {
      if (!localStorage.getItem("token")) {
        return false;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);
