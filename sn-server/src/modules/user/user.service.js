const bcrypt = require("bcrypt");
const User = require("./user.model");
const { logoutAction } = require("../auth/auth.service");
const Role = require("../role/role.model");

const getUserService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
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
  console.log(
    "🚀 ~ file: user.service.js:22 ~ getUserService ~ userObject:",
    userObject
  );
  return userObject;
};

const updatePassService = async (id, password) => {
  const [user, hashedPassword] = await Promise.all([
    User.findByPk(id),
    bcrypt.hash(password, 10),
  ]);
  user.password = hashedPassword;
  await user.save();
  await logoutAction(user);
  return;
};

const updateEmailAction = async (id, email) => {
  const user = await User.findByPk(id);
  user.email = email;
  await user.save();
  await logoutAction(user);
  return;
};

const updateDataAction = async (id, data) => {
  if (data.birthdate) {
    console.log(
      "🚀 ~ file: user.service.js:50 ~ updateDataAction ~ data.birthdate:",
      data.birthdate
    );
    data.birthdate = new Date(data.birthdate);
    console.log(
      "🚀 ~ file: user.service.js:55 ~ updateDataAction ~ data.birthdate:",
      data.birthdate
    );
  }
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  return user.update(data);
};

const uploadImageService = async (id, newImage) => {
  const userExists = await User.findByPk(id);
  console.log(
    "🚀 ~ file: user.service.js:57 ~ uploadImageService ~ userExists:",
    userExists
  );
  userExists.image = newImage;
  await userExists.save();
  return userExists.image;
};

module.exports = {
  getUserService,
  updatePassService,
  updateEmailAction,
  updateDataAction,
  uploadImageService,
};
