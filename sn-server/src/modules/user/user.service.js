const bcrypt = require("bcrypt");
const User = require("./user.model");
const { logoutService } = require("../auth/auth.service");

/**
 * This function is responsible for searching for a user based on their ID.
 * @param {string} id
 * @returns user data
 */
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
  return userObject;
};

/**
 * This function is responsible for updating a user's password by searching for it by its ID and then calls the logout service to remove the user's token
 * @param {string} id
 * @param {string} password
 * @returns void
 */
const updatePassService = async (id, password) => {
  const [user, hashedPassword] = await Promise.all([
    User.findByPk(id),
    bcrypt.hash(password, 10),
  ]);
  user.password = hashedPassword;
  await user.save();
  await logoutService(user);
  return;
};

/**
 * This function is responsible for updating a user's email, searching for it by its ID
 * @param {string} id
 * @param {string} email
 * @returns void
 */
const updateEmailAction = async (id, email) => {
  const user = await User.findByPk(id);
  user.email = email;
  await user.save();
  await logoutService(user);
  return;
};

/**
 * This function is responsible for updating the (optional) data of a user, searching for them by their ID.
 * @param {string} id
 * @param {*} data
 * @returns
 */
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

/**
 * This function is responsible for updating a user's image, searching for it by its ID
 * @param {string} id
 * @param {string} newImage
 * @returns
 */
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
