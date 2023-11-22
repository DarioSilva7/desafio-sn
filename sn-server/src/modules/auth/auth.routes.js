const authRoutes = require("express").Router();
const { verifyAuth } = require("../../middlewares/verifyAuth");
const { validateUserByEmail } = require("../user/user.validate");
const {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
} = require("./auth.controller");
const {
  validateLogin,
  validateRegister,
  emailVerification,
  validateResetPassword,
} = require("./auth.validate");

authRoutes.get("/", (req, res) => res.send("AUTH ROUTES"));
authRoutes.post("/register", validateRegister, emailVerification, register);
authRoutes.post("/login", validateLogin, login);
authRoutes.post("/logout", verifyAuth, logout);
authRoutes.post("/forgot-password", validateUserByEmail, forgotPassword);
authRoutes.put(
  "/reset-password",
  verifyAuth,
  validateResetPassword,
  resetPassword
);

module.exports = authRoutes;
