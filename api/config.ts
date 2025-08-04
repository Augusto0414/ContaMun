import axios, { AxiosHeaders } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const headers = new AxiosHeaders(config.headers as any);
      headers.set("Authorization", `Bearer ${token}`);
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
