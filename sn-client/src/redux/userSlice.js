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
  errors: null,
  messages: null,
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
      window.localStorage.clear();
      state.user = null;
    },
    changeImage: (state, action) => {
      state.profilePicture = action.payload;
    },
    changeImageAsAdmin: (state, action) => {
      const userFounded = state.allUsers.find(
        (u) => u.id == action.payload.userId
      );
      userFounded.image = action.payload.image;
    },
    changeDataAsAdmin: (state, action) => {
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
      state.allUsers = action.payload.users.filter((u) => u.active == true);
      state.inactiveUsers = action.payload.users.filter(
        (u) => u.active == false
      );
      state.qtyUsers = action.payload.qtyUsers;
      state.limit = action.payload.limit;
    },
    loadUser: (state, action) => {
      state.user = { ...action.payload };
    },
    inactivateUser: (state, action) => {
      const userFounded = state.allUsers.find((u) => u.id == action.payload);
      userFounded.active = false;

      state.inactiveUsers = [...state.inactiveUsers, userFounded];

      state.allUsers = [
        ...state.allUsers.filter((u) => u.id !== action.payload),
      ];
    },
    reactivateUser: (state, action) => {
      const userFounded = state.inactiveUsers.find(
        (u) => u.id == action.payload
      );
      userFounded.active = true;
      state.allUsers = [...state.allUsers, userFounded];
      state.inactiveUsers = [
        ...state.inactiveUsers.filter((user) => user.id !== action.payload),
      ];
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
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
  inactivateUser,
  reactivateUser,
  changeImageAsAdmin,
  setErrors,
  setMessages,
} = userSlice.actions;

export default userSlice.reducer;
