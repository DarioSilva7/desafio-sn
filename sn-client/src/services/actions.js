import { login, logout, register } from "../api/auth";
import Cookies from "universal-cookie";
import { ADMIN_PATH, USER_PATH } from "../config";
import axiosInstance from "../config/axios";
const cookies = new Cookies();

export const ACTIONS = {
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  LOADING: "LOADING",
};

const loginAction = async (payload) => {
  try {
    const { data } = await login(payload);
    if (data.ok) {
      return { token: data.data.token, user: data.data.user };
    } else {
      console.log("🚀 ~ file: actions.js:26 ~ loginAction ~ ELSEE");
      return "NO SE";
    }
  } catch (error) {
    // alert(error.response.data.error[0].message);
    console.log("🚀 ~ file: actions.js:14 ~ login ~ error:", error);
    alert(error.response.data.error.map((e) => e.message));
    // return "EN EL CATCH";
  }
};

const logoutAction = async () => {
  try {
    const { data } = await logout();
    if (data.ok) {
      cookies.remove("token");
      return;
    }
  } catch (error) {
    alert(error.response.data.error.map((e) => e.error));
  }
};

const registerAction = async (user) => {
  try {
    const { data } = await register(user);
    if (data.ok) {
      return data.message;
    }
  } catch (error) {
    alert(error.response.data.error.map((e) => e.error));
  }
};

const updateEmailAction = async (isAdmin, userId, email) => {
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/email`
      : `${USER_PATH}/profile/edit/email`;
    const rta = await axiosInstance.put(`${endpoint}`, {
      email,
    });
    alert(rta.data.message);
    return rta;
  } catch (error) {
    throw new Error(`${error.response.data.error[0].message}`);
  }
};

const updatePasswordAction = async (isAdmin, userId, newPass) => {
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/password`
      : `${USER_PATH}/profile/edit/pass`;
    const { data } = await axiosInstance.put(`${endpoint}`, newPass);
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: actions.js:84 ~ updatePasswordAction ~ error:",
      error
    );
    alert(error.response.data.error.map((e) => e.message));
  }
};

const updateImageAction = async (isAdmin, userId, image) => {
  console.log(
    "🚀 ~ file: actions.js:97 ~ updateImageAction ~ isAdmin, userId, image:",
    isAdmin,
    userId,
    image
  );
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/image`
      : `${USER_PATH}/profile/edit/image`;
    const { data } = await axiosInstance.post(`${endpoint}`, {
      image,
    });
    return data;
  } catch (error) {
    alert(error.response.data.error.map((e) => e.error));
  }
};

const updateDataAction = async (isAdmin, userId, payload) => {
  console.log("🚀 ~ file: actions.js:121 ~ updateDataAction ~ data:", payload);
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/data`
      : `${USER_PATH}/profile/edit/data`;
    const { data } = await axiosInstance.put(`${endpoint}`, payload);
    return data;
  } catch (error) {
    alert(error.response.data.error.map((e) => e.error));
  }
};

const deleteUserAction = async (userId) => {
  try {
    return axiosInstance.delete(`/admin/user/${userId}`);
  } catch (error) {
    alert(error.response.data.error.map((e) => e.error));
  }
};

// const getUsersAction = async (page, payload) => {
const getUsersAction = async (page) => {
  try {
    // if (payload) {
    //   const { first_name, last_name } = payload;
    //   let url = `/admin/users?page=${page}`;
    //   if (first_name) url += `&first_name=${first_name}`;
    //   if (last_name) url += `&last_name=${last_name}`;

    //   console.log("🚀 ~ file: actions.js:135 ~ getUsersAction ~ url:", url);
    //   const { data } = await axiosInstance.get(
    //     url
    //     // `/admin/users?page=${page}&first_name=${first_name}&last_name=${last_name}`
    //   );
    //   return data.data.users;
    // }
    const { data } = await axiosInstance.get(`/admin/users?page=${page}`);
    console.log(
      "🚀 ~ file: actions.js:144 ~ getUsersAction ~ data:",
      data.data
    );
    return data.data;
  } catch (error) {
    console.log("🚀 ~ file: actions.js:129 ~ getUsersAction ~ error:", error);
    alert(error.response.data.error.map((e) => e.error));
  }
};

const getUserDetailAction = async () => {
  try {
    const { data } = await axiosInstance.get(`/user`);
    return data;
  } catch (error) {
    alert(error.response.data.error.map((e) => e.error));
  }
};

const activeUserAction = async (userId) => {
  try {
    const { data } = await axiosInstance.put(`/admin/user/${userId}`);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: actions.js:149 ~ activeUserAction ~ error:", error);
    alert(error.response.data.error.map((e) => e.error));
  }
};

export {
  loginAction,
  logoutAction,
  registerAction,
  updateEmailAction,
  updatePasswordAction,
  updateImageAction,
  updateDataAction,
  deleteUserAction,
  getUsersAction,
  getUserDetailAction,
  activeUserAction,
};
