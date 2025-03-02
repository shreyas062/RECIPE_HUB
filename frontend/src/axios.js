import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle 401 errors & attempt to refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Attempting to refresh token...");
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.warn("No refresh token found. Redirecting to login...");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Request a new token
        const res = await axios.post("http://localhost:5000/api/auth/refresh", { token: refreshToken });
        localStorage.setItem("token", res.data.token);

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${res.data.token}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
