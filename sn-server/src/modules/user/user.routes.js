const {
  validateRenewPassword,
  validateRenewEmail,
} = require("../auth/auth.validate");
const { updatePass, updateEmail, updateData } = require("./user.controller");

const userRoutes = require("express").Router();

userRoutes.put("/update-pass", validateRenewPassword, updatePass);
userRoutes.put("/update-email", validateRenewEmail, updateEmail);
userRoutes.put("/update-data", updateData);

module.exports = userRoutes;
