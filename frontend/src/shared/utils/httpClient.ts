import axios from "axios";
import { getCookie, deleteCookie } from "./cookie";
import qs from "qs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

httpClient.interceptors.request.use((config) => {
  const token = getCookie("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response?.status === 401) {
      deleteCookie("token");

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);
