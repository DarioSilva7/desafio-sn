import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { decodeToken } from "../utils/JWT";
const cookies = new Cookies(null, { path: "/" });

const initialState = {
  roles: [],
  isAdmin: false,
  isRegister: false,
  isLoading: false,
  user: null,
  profilePicture: null,
  allUsers: null,
  inactiveUsers: null,
  limit: 10,
  qtyUsers: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginUser: (state, action) => {
      cookies.set("token", action.payload.token);
      state.user = { ...action.payload.user };
      const decoded = decodeToken(cookies.get("token"));
      state.roles = decoded.payload.roles;
      state.isAdmin = state.roles.includes("admin");
      state.profilePicture = action.payload.user.image;
      state.isLoading = false;
    },
    logout: (state, action) => {
      cookies.remove("token");
      state.user = null;
    },
    changeImage: (state, action) => {
      console.log("🚀 ~ file: userSlice.js:39 ~ action.payload:", action);

      state.profilePicture = action.payload;
    },
    changeImageAsAdmin: (state, action) => {
      const userFounded = state.allUsers.find(
        (u) => u.id == action.payload.userId
      );
      userFounded.image = action.payload.image;
    },
    changeDataAsAdmin: (state, action) => {
      console.log("🚀 ~ file: userSlice.js:51 ~ action:", action.payload);
      state.allUsers = state.allUsers.map((u) =>
        u.id == action.payload.id
          ? {
              ...u,
              ...action.payload,
            }
          : u
      );
    },
    loadUsers: (state, action) => {
      console.log("🚀 ~ file: userSlice.js:62 ~ action:", action.payload);
      state.allUsers = action.payload.users.filter((u) => u.active == true);
      state.inactiveUsers = action.payload.users.filter(
        (u) => u.active == false
      );
      state.qtyUsers = action.payload.qtyUsers;
      state.limit = action.payload.limit;
    },
    loadUser: (state, action) => {
      console.log("🚀 ~ file: userSlice.js:71 ~ action:", action.payload);
      state.user = { ...action.payload };
    },
    filterById: (state, action) => {
      state.inactiveUsers = [
        ...state.inactiveUsers,
        state.allUsers.find((user) => user.id == action.payload),
      ];
      state.allUsers = state.allUsers.filter(
        (user) => user.id != action.payload
      );
    },
    reactivateUser: (state, action) => {
      state.allUsers = [
        ...state.allUsers,
        state.inactiveUsers.find((user) => user.id == action.payload),
      ];
      state.inactiveUsers = state.inactiveUsers.filter(
        (user) => user.id != action.payload
      );
    },
  },
});

export const {
  loading,
  loginUser,
  changeImage,
  logout,
  changeDataAsAdmin,
  loadUsers,
  loadUser,
  filterById,
  reactivateUser,
  changeImageAsAdmin,
} = userSlice.actions;

export default userSlice.reducer;
