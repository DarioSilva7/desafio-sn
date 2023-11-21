import axiosInstance from "../config/axios";

export const getUsersAsAdmin = async () => {
  try {
    const { data } = await axiosInstance.get(`/admin/users`);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: admin.js:10 ~ getUsers ~ error:", error);
    alert(error);
  }
};

export const updatePasswordUserAsAdmin = async (userId, password) => {
  try {
    return axiosInstance.put(`/admin/user/${userId}/profile/edit/pass`, {
      password,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: admin.js:30 ~ updatePasswordUserAsAdmin ~ error:",
      error
    );
  }
};

export const updateImageUserAsAdmin = async (userId, image) => {
  try {
    return axiosInstance.put(`/admin/user/${userId}/profile/edit/image`, {
      image,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: admin.js:40 ~ updateImageUserAsAdmin ~ error:",
      error
    );
  }
};

export const updateDataUserAsAdmin = async (userId, data) => {
  try {
    const userUpdated = await axiosInstance.put(
      `/admin/user/${userId}/profile/edit/data`,
      {
        data,
      }
    );
    return userUpdated;
  } catch (error) {
    console.log(
      "🚀 ~ file: admin.js:59 ~ updateDataUserAsAdmin ~ error:",
      error
    );
  }
};

export const deleteUserAsAdmin = async (userId) => {
  try {
    return axiosInstance.delete(`/admin/user/${userId}`);
  } catch (error) {
    console.log("🚀 ~ file: admin.js:50 ~ deleteUserAsAdmin ~ error:", error);
  }
};
