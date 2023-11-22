import Cookies from "universal-cookie";
import axios from "axios";
import { login, logout, register } from "../api/auth";
import { ADMIN_PATH, AUTH_PATH, USER_PATH } from "../config";
import axiosInstance from "../config/axios";
const cookies = new Cookies();
import { store } from "../redux/store";
import { setErrors } from "../redux/userSlice";

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
    }
  } catch (error) {
    store.dispatch(
      setErrors([{ error: error.response.data.error[0].message }])
    );
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
    store.dispatch(setErrors(error.response.data.error));
  }
};

const registerAction = async (user) => {
  try {
    const { data } = await register(user);
    return data;
  } catch (error) {
    store.dispatch(
      setErrors([{ error: error.response.data.error[0].message }])
    );
    return { data: { ok: false } };
  }
};

const updateEmailAction = async (isAdmin, userId, email) => {
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/email`
      : `${USER_PATH}/profile/edit/email`;
    await axiosInstance.put(`${endpoint}`, {
      email,
    });
    return;
  } catch (error) {
    store.dispatch(setErrors(error.response.data.error));
    return false;
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
    store.dispatch(setErrors([{ error: error.response.data.error[0].error }]));
  }
};

const updateImageAction = async (isAdmin, userId, image) => {
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/image`
      : `${USER_PATH}/profile/edit/image`;
    const { data } = await axiosInstance.post(`${endpoint}`, {
      image,
    });
    return data;
  } catch (error) {
    store.dispatch(setErrors(error.response.data.error));
  }
};

const updateDataAction = async (isAdmin, userId, payload) => {
  try {
    const endpoint = isAdmin
      ? `${ADMIN_PATH}/user/${userId}/profile/edit/data`
      : `${USER_PATH}/profile/edit/data`;
    const { data } = await axiosInstance.put(`${endpoint}`, payload);
    return data;
  } catch (error) {
    store.dispatch(setErrors(error.response.data.error));
    return { data: { ok: false } };
  }
};

const deleteUserAction = async (userId) => {
  try {
    const { data } = await axiosInstance.delete(`/admin/user/${userId}`);
    return data;
  } catch (error) {
    store.dispatch(setErrors(error.response.data.error));
  }
};

// const getUsersAction = async (page) => {
const getUsersAction = async (page, payload) => {
  try {
    if (payload) {
      const { first_name } = payload;
      let url = `/admin/users?page=${page}&first_name=${first_name}`;
      const { data } = await axiosInstance.get(url);
      return data.data;
    } else {
      const { data } = await axiosInstance.get(`/admin/users?page=${page}`);
      return data.data;
    }
  } catch (error) {
    console.log("🚀 ~ file: actions.js:129 ~ getUsersAction ~ error:", error);
    store.dispatch(setErrors(error.response.data.error));
  }
};

const getUserDetailAction = async () => {
  try {
    const { data } = await axiosInstance.get(`/user`);
    return data;
  } catch (error) {
    store.dispatch(setErrors(error.response.data.error));
  }
};

const activeUserAction = async (userId) => {
  try {
    const { data } = await axiosInstance.put(`/admin/user/${userId}`);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: actions.js:149 ~ activeUserAction ~ error:", error);
    store.dispatch(setErrors(error.response.data.error));
  }
};

const postForgotPassword = async (email) => {
  try {
    const { data } = await axios.post(`${AUTH_PATH}/forgot-password`, {
      email,
    });
    return data.message;
  } catch (error) {
    console.log(
      "🚀 ~ file: actions.js:162 ~ postForgotPassword ~ error:",
      error
    );
    store.dispatch(setErrors(error.response.data.error));
  }
};

const putResetPasswordAction = async (values, tokenResetPassword) => {
  try {
    const { data } = await axiosInstance.put("/auth/reset-password", values, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + tokenResetPassword,
      },
    });
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: actions.js:149 ~ putResetPasswordAction ~ error:",
      error
    );
    store.dispatch(setErrors(error.response.data.error));
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
  postForgotPassword,
  putResetPasswordAction,
};
