import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Adjusted timeout
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: Handle dynamic headers
    if (config.headers["Content-Type"] === "multipart/form-data") {
      delete config.headers["Content-Type"]; // Let the browser set it
    }

    return config;
  },
  function (error) {
    return Promise.reject(error); // Log or handle errors if needed
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Network error or CORS issue detected:", error.message);
      toast.error("A network error occurred. Please try again.");
    }
    return Promise.reject(error); // Ensure other errors are still thrown
  }
);

// Add a response interceptor (Optional)
axiosInstance.interceptors.response.use(
  (response) => response, // Let successful responses pass through
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Optionally, redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
