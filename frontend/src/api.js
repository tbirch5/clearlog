// JWT token refresh using an axios interceptor.
// App will quietly refresh access token via refresh token when access token expires.
import axios from "axios";

const baseURL = "http://127.0.0.1:8000/"; // adjust later with backend deployment URL

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Refresh token logic
api.interceptors.response.use(
  response => response, // return response if successful
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${baseURL}/api/auth/jwt/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry original request with new token
      } catch (refreshError) {
        console.error("Refresh token invalid:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
