const adminRoutes = require("express").Router();
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
  validateUserActivated,
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
const { getUserDetailService } = require("./admin.service");

adminRoutes.get("/", (req, res) => res.send("ADMIN ROUTES"));
adminRoutes.get("/users", getUsers);

adminRoutes.get("/user/:userId", validateUserIdByParams, getUserDetailService);

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
  "/user/:userId/profile/edit/pass",
  validateUserIdByParams,
  validateRenewPassword,
  updateUserPassByAdmin
);
adminRoutes.put(
  "/user/:userId/profile/edit/email",
  validateUserIdByParams,
  validateRenewEmail,
  updateUserEmailByAdmin
);
adminRoutes.put(
  "/user/:userId/profile/edit/data",
  validateUserIdByParams,
  validateData,
  updateUserDataByAdmin
);
adminRoutes.post(
  "/user/:userId/profile/edit/image",
  validateUserIdByParams,
  upload.single("image"),
  uploadUserImageByAdmin
);

// TODO modificar datos de los usuarios

module.exports = adminRoutes;
