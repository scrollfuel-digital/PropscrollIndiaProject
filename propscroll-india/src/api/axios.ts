import axios from "axios";

export const api = axios.create({
  baseURL: "https://propscrollindiaproject.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
