// import axios from "axios";
import { USER_PATH } from "../config";
import axiosInstance from "../config/axios";

const getUser = async () => {
  try {
    const { data } = await axiosInstance.get(`${USER_PATH}`);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: user.js:10 ~ getUser ~ error:", error);
  }
};

const editPass = async (payload) => {
  return axiosInstance.put(`${USER_PATH}/profile/edit/pass`, payload);
};
const editEmail = async (payload) => {
  return axiosInstance.put(`${USER_PATH}/profile/edit/email`, payload);
};
const editData = async (payload) => {
  return axiosInstance.put(`${USER_PATH}/profile/edit/data`, payload);
};
const editImage = async (payload) => {
  return axiosInstance.post(`${USER_PATH}/profile/edit/image`, payload);
};

export { getUser, editPass, editEmail, editData, editImage };
