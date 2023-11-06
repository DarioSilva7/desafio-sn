const { checkRole } = require("../../middlewares/checkRole");
const { verifyAuth } = require("../../middlewares/verifyAuth");
const { createRole } = require("./role.controller");

const roleRoutes = require("express").Router();

roleRoutes.post("/create", createRole);

module.exports = roleRoutes;
