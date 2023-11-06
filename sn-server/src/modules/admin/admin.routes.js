const { upload } = require("../../middlewares/multer");
const {
  validateRenewPassword,
  validateRenewEmail,
  validateData,
} = require("../auth/auth.validate");
const { roleValidation } = require("../role/role.validate");
const {
  validateUserIdByParams,
  validateUserDeleted,
  validateUserAlreadyActive,
} = require("../user/user.validate");
const {
  addRole,
  getUsers,
  userSoftDelete,
  activeUser,
  updateUserPassByAdmin,
  updateUserEmailByAdmin,
  updateUserDataByAdmin,
  uploadUserImageByAdmin,
} = require("./admin.controller");

const adminRoutes = require("express").Router();

adminRoutes.get("/users", getUsers);
adminRoutes.delete(
  "/user/:userId",
  validateUserIdByParams,
  validateUserDeleted,
  userSoftDelete
);

adminRoutes.put(
  "/user/:userId",
  validateUserIdByParams,
  validateUserAlreadyActive,
  activeUser
);

adminRoutes.put(
  "/add-role/:userId",
  validateUserIdByParams,
  roleValidation,
  addRole
);

adminRoutes.put(
  "/user/profile/edit/pass",
  validateRenewPassword,
  updateUserPassByAdmin
);
adminRoutes.put(
  "/user/profile/edit/email",
  validateRenewEmail,
  updateUserEmailByAdmin
);
adminRoutes.put("/user/profile/edit/data", validateData, updateUserDataByAdmin);
adminRoutes.post(
  "/user/profile/edit/image",
  upload.single("image"),
  uploadUserImageByAdmin
);

// TODO modificar datos de los usuarios

module.exports = adminRoutes;
