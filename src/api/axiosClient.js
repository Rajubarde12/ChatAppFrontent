// axios.js
import axios from "axios";
import { API_URL } from "../constants";
import { getString } from "../utils/storage";

const api = axios.create({
  baseURL: API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
     const token = getString("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Something went wrong!";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("No response from server. Please check your network.");
    } else {
      throw new Error(error.message);
    }
  }
);

export default api;
