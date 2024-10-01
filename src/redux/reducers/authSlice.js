import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { resetState } from "../reset";
import { CheckAuth, LoginRequest } from "../actions/authAction";

const initialState = {
  auth: false,
  inputs: {
    userName: "",
    password: "",
  },
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setInputs: (state, action) => {
      state.inputs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
    builder.addCase(LoginRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.auth = true;
        state.inputs = initialState.inputs;
        toast.success("Uğurlu giriş", {
          position: "bottom-right",
        });
      } else {
        toast.error("Ad və ya şifrə yanlışdır", {
          position: "bottom-right",
        });
      }
    });
    builder.addCase(LoginRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LoginRequest.rejected, (state) => {
      state.loading = false;
      toast.error("Xəta baş verdi", {
        position: "bottom-right",
      });
    });
    builder.addCase(CheckAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.auth = true;
      }
    });
    builder.addCase(CheckAuth.pending, () => {});
    builder.addCase(CheckAuth.rejected, () => {
      toast.error("Xəta baş verdi", {
        position: "bottom-right",
      });
    });
  },
});

export default authSlice.reducer;
export const { setAuth, setInputs, setLoading } = authSlice.actions;
