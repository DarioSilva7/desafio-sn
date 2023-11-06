const { upload } = require("../../middlewares/multer");
const {
  validateRenewPassword,
  validateRenewEmail,
  validateData,
} = require("../auth/auth.validate");
const {
  updatePass,
  updateEmail,
  updateData,
  uploadUserImage,
} = require("./user.controller");

const userRoutes = require("express").Router();

userRoutes.put("/profile/edit/pass", validateRenewPassword, updatePass);
userRoutes.put("/profile/edit/email", validateRenewEmail, updateEmail);
userRoutes.put("/profile/edit/data", validateData, updateData);
userRoutes.post("/profile/edit/image", upload.single("image"), uploadUserImage);

module.exports = userRoutes;
