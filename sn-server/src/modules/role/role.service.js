// const boom = require("@hapi/boom");
const Role = require("../role/role.model");

/**
 * This function is responsible for create a role
 * @param {string} name
 * @returns role created
 */
const createRoleService = async (name) => {
  const roleCreated = await Role.create({ name });
  return roleCreated;
};
module.exports = { createRoleService };
