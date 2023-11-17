import axiosInstance from "../config/axios";

const login = async (payload) => {
  return axiosInstance.post(`/auth/login`, payload);
};

const logout = async () => {
  const { data } = await axiosInstance.post(`/auth/logout`);
  return data;
};

const register = async (user) => {
  return await axiosInstance.post(`/auth/register`, user);
};
export { login, logout, register };
