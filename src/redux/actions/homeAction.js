// import api from "../../services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
export const GetAllPosts = createAsyncThunk(
  "home/GetAllPosts",
  async (_, thunkApi) => {
    try {
      const response = await api.get(`/posts`);
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
