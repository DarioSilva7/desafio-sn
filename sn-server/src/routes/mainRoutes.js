const express = require("express");
const adminRoutes = require("../modules/admin/admin.routes");
const authRoutes = require("../modules/auth/auth.routes");
const roleRoutes = require("../modules/role/role.routes");
const userRoutes = require("../modules/user/user.routes");
const { checkRole } = require("../middlewares/checkRole");
const { verifyAuth } = require("../middlewares/verifyAuth");

const mainRoutes = express.Router();

mainRoutes.get("/", (req, res) => res.send("MAIN ROUTE"));
mainRoutes.use("/auth", authRoutes);
mainRoutes.use(verifyAuth);
mainRoutes.use("/admin", checkRole("admin"), adminRoutes);
mainRoutes.use("/user", checkRole("user"), userRoutes);
mainRoutes.use("/role", /*checkRole("user"),*/ roleRoutes);

module.exports = { mainRoutes };
