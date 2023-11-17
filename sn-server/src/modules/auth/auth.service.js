const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const { generateToken } = require("../../jwt/jwt");
const User = require("../user/user.model");
const UserToken = require("../userToken/userToken.model");
const Role = require("../role/role.model");
const msgErrors = require("../../constants/errorMessage.json");
// const { createVerificationCode } = require("../../utils/verificationCode");

const registerAction = async (user) => {
  // user.verificationCode= createVerificationCode();

  const userFounded = await User.create(user);
  // await sendVerificationCode(email, verificationCode);
  return userFounded.id;
};

const loginAction = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email: email },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Role,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });
  if (!(await bcrypt.compare(password, user.password))) {
    throw boom.unauthorized(msgErrors.auth.invalidCredentials);
  }
  console.log("🚀 ~ file: auth.service.js:32 ~ loginAction ~ user:", user);

  const payload = {
    id: user.id,
    email: user.email,
    active: user.active,
    roles: user.Roles.map((r) => r.name),
  };
  const token = generateToken(payload);

  await user.addUserToken(token, user.id);

  const userObject = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    birthdate: user.birthdate,
    dni: user.dni,
    email: user.email,
    image: user.image,
    active: user.active,
  };
  return [token, userObject];
};

const logoutAction = async (userLogged) => {
  return UserToken.destroy({ where: { userId: userLogged.id } });
};

const renewPasswordService = async (id, password) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw boom.notFound("Credenciales invalidas");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    return await user.save();
  }
};

module.exports = {
  registerAction,
  loginAction,
  logoutAction,
  renewPasswordService,
};
