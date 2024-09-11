import axios from "axios";
import Cookies from "js-cookie";

export const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const { data } = await client.post("/token/refresh/", {
          refresh: refreshToken,
        });
        Cookies.set("accessToken", data.access, { path: "/" });
        Cookies.set("refreshToken", data.refresh, { path: "/" });
        client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access}`;
        return client(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        if (typeof window !== "undefined") {
          window.location.href = "/accounts/login";
        }
      }
    }
    return Promise.reject(error);
  }
);
