import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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

client.interceptors.request.use(
  (response) => response,
  async (error) => {
    const router = useRouter();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const { data } = await client.post("/token/refresh/", {
          refresh: refreshToken,
        });
        console.log(data);
        Cookies.set("accessToken", data.access, { path: "/" });
        Cookies.set("refreshToken", data.refresh, { path: "/" });

        return client(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        if (typeof window !== "undefined") {
          router.push("/accounts/login");
        }
      }
    }
    return Promise.reject(error);
  }
);
