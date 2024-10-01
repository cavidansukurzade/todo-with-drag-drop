import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import homeReducer from "./reducers/homeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
