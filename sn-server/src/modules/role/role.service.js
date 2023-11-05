// const boom = require("@hapi/boom");
const Role = require("../role/role.model");

const createRoleService = async (name) => {
  const roleCreated = await Role.create({ name });
  return roleCreated;
};
module.exports = { createRoleService };
