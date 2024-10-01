import axios from "axios";
import { store } from "../redux/store";
import { setAuth } from "../redux/reducers/authSlice";

const baseUrl = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json-patch+json",
  },
  mode: "no-cors",
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") ?? "";
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  async (error) => {
    console.log("error", error);
    const originalConfig = error.config;
    if (error.response) {
      if (
        error.response.status === 401 &&
        !originalConfig._retry &&
        error.config
      ) {
        try {
          localStorage.removeItem("token");
          store.dispatch(setAuth(false));
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    throw error;
  }
);
export default instance;
