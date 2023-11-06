const boom = require("@hapi/boom");
const Role = require("../role/role.model");
const User = require("../user/user.model");

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

const getUsersService = async (limit, page, status) => {
  const where = status !== null ? { active: status } : {};
  const allUsers = await User.findAll({
    where,
    limit,
    offset: (page - 1) * limit,
    order: [["createdAt", "ASC"]],
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
  return allUsers;
};

const userSoftDeleteService = async (userId) => {
  const userFounded = await User.findByPk(userId);
  userFounded.active = false;
  return userFounded.save();
};

const activeUserService = async (userId) => {
  const userFounded = await User.findByPk(userId);
  userFounded.active = true;
  return userFounded.save();
};

module.exports = {
  addRoleService,
  getUsersService,
  userSoftDeleteService,
  activeUserService,
};
