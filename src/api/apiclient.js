import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// axios instance
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// export clean API methods
export const client = {
  get: (url) => instance.get(url),
  post: (url, data) => instance.post(url, data),
  put: (url, data) => instance.put(url, data),
  delete: (url) => instance.delete(url),
};