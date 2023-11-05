const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const User = require("./user.model");
const { logoutService } = require("../auth/auth.service");

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

const updateEmailService = async (id, email) => {
  const user = await User.findByPk(id);
  user.email = email;
  await user.save();
  await logoutService(user);
  return;
};

module.exports = {
  updatePassService,
  updateEmailService,
};
