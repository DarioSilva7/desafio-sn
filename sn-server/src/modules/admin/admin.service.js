const boom = require("@hapi/boom");
const Role = require("../role/role.model");
const User = require("../user/user.model");
const { Op } = require("../../config/database");

/**
 * This function is responsible for adding a role to the user
 * @param {UUID} roleId
 * @param {UUID} userId
 * @returns user data updated
 */
const addRoleService = async (roleId, userId) => {
  const [roleFounded, userFounded] = await Promise.all([
    Role.findByPk(roleId),
    User.findByPk(userId, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    }),
  ]);
  const rolesOfUser = await userFounded.getRoles();

  const roleExists = rolesOfUser.find((r) => r.id == roleId);
  if (roleExists) throw boom.badRequest("El usuario ya cuenta con el role");
  userFounded.addRole(roleFounded);
  return userFounded.save();
};

/**
 * This function is responsible for obtaining all the users in the database, if it receives the first_name parameter, it searches by match
 * @param {UUID} userId
 * @param {number} limit
 * @param {number} page
 * @param {string} status
 * @param {string} first_name
 * @returns an array with the users found and the number of users found
 */
const getUsersAction = async (userId, limit, page, status, first_name) => {
  if (first_name) {
    const usersFounded = await User.findAll({
      where: {
        first_name: { [Op.like]: `%${first_name}%` },
      },
      limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    return [usersFounded, usersFounded.length];
  }
  const where = status !== null ? { active: status, id } : {};
  const [allUsers, qtyUsers] = await Promise.all([
    User.findAll({
      where: { ...where, id: { [Op.ne]: userId } },
      limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    }),
    User.count(),
  ]);
  return [allUsers, qtyUsers];
};

/**
 * This function is responsible for obtaining a user's data according to their ID.
 * @param {UUID} userId
 * @returns user data
 */
const getUserDetailService = async (userId) => {
  return await User.findByPk(userId, {
    attributes: {
      exclude: ["password", "birthdate"],
    },
    include: [
      {
        model: Role,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
  });
};

/**
 * This function is responsible for logically deleting a user based on their ID.
 * @param {UUID} userId
 * @returns user data
 */
const userSoftDeleteService = async (userId) => {
  const userFounded = await User.findByPk(userId);
  userFounded.active = false;
  return userFounded.save();
};

/**
 * This function is responsible for logically reactivating a user, searching for them based on their ID.
 * @param {UUID} userId
 * @returns user data
 */
const activeUserAction = async (userId) => {
  const userFounded = await User.findByPk(userId);
  userFounded.active = true;
  return userFounded.save();
};

module.exports = {
  addRoleService,
  getUsersAction,
  userSoftDeleteService,
  activeUserAction,
  getUserDetailService,
};
