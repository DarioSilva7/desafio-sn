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

module.exports = adminRoutes;
