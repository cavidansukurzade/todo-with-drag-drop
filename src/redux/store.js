import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import homeReducer from "./reducers/homeSlice";
import { jsonPlaceholderApi } from "./services/jsonPlaceholder";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
});
setupListeners(store.dispatch);
