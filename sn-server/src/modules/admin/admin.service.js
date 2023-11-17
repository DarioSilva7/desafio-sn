const boom = require("@hapi/boom");
const Role = require("../role/role.model");
const User = require("../user/user.model");
const { Op } = require("../../config/database");

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

const getUsersAction = async (
  userId,
  limit,
  page,
  status,
  first_name,
  last_name
) => {
  if (first_name) {
    return User.findAll({
      where: {
        first_name: { [Op.like]: `%${first_name}%` },
        last_name: { [Op.like]: `%${last_name}%` },
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

const getUserDetailAction = async (userId) => {
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

const userSoftDeleteService = async (userId) => {
  const userFounded = await User.findByPk(userId);
  userFounded.active = false;
  return userFounded.save();
};

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
  getUserDetailAction,
};
