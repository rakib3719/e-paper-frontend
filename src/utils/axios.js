import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://e-paper-backend.vercel.app/api",
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized (token expired, invalid, etc.)
//       window.location.href = '/login'; // Redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;