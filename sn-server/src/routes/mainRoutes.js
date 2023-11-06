const mainRoutes = require("express").Router();
const { checkRole } = require("../middlewares/checkRole");
const { verifyAuth } = require("../middlewares/verifyAuth");
const adminRoutes = require("../modules/admin/admin.routes");
const authRoutes = require("../modules/auth/auth.routes");
const roleRoutes = require("../modules/role/role.routes");
const userRoutes = require("../modules/user/user.routes");

mainRoutes.use("/auth", authRoutes);
mainRoutes.use(verifyAuth);
mainRoutes.use("/admin", checkRole("admin"), adminRoutes);
mainRoutes.use("/user", checkRole("user"), userRoutes);
mainRoutes.use("/role", /*checkRole("user"),*/ roleRoutes);

module.exports = { mainRoutes };
