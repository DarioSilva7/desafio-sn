import axios from "axios";
import Cookies from "universal-cookie";
import { API_PATH } from ".";

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: API_PATH,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
