import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CheckAuth, LoginRequest } from "../actions/authAction";
import { resetState } from "../reset";
const initialState = {
  auth: false,
  loginInputs: {
    userName: "",
    password: "",
  },
  errorInputs: {},
  loading: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUserName: (state, action) => {
      state.loginInputs.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.loginInputs.password = action.payload;
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
        state.loginInputs = initialState.loginInputs;
        state.errorInputs = initialState.errorInputs;
        toast.success("Uğurlu giriş", {
          position: "bottom-right",
        });
      } else {
        toast.error("Ad və ya şifrə yanlışdır", {
          position: "bottom-right",
        });
        state.errorInputs.userName = true;
        state.errorInputs.password = true;
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
export const { setAuth, setEmail, setPassword, setLoading } = authSlice.actions;
