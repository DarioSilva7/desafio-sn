const authRoutes = require("express").Router();
const { verifyAuth } = require("../../middlewares/verifyAuth");
const { login, register, logout } = require("./auth.controller");
const {
  validateLogin,
  validateRegister,
  emailVerification,
  // validateRenewPassword,
} = require("./auth.validate");

authRoutes.get("/", (req, res) => res.send("AUTH ROUTES"));
authRoutes.post("/register", validateRegister, emailVerification, register);
authRoutes.post("/login", validateLogin, login);
authRoutes.post("/logout", verifyAuth, logout);

//   "/renew-password",
//   verifyAuth,
//   validateRenewPassword,
//   renewPassword
// );

module.exports = authRoutes;
