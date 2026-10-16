import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

api.interceptors.request.use(
  (config) => {
    // Add authentication headers here if required.
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle expired or invalid authentication.
    }

    return Promise.reject(error);
  }
);

export default api;