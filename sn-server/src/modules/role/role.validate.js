const boom = require("@hapi/boom");
const Role = require("./role.model");

const roleValidation = async (req, res, next) => {
  const { roleId } = req.body;
  const roleExists = await Role.findByPk(roleId);
  if (roleExists) {
    next();
  } else next(boom.badRequest("El rol es incorrecto"));
};

module.exports = { roleValidation };
