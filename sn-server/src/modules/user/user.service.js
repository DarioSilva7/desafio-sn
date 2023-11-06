const bcrypt = require("bcrypt");
const User = require("./user.model");
const { logoutService } = require("../auth/auth.service");
const fs = require("fs");
const { extname, join } = require("path");

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

const updateDataService = async (id, data) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  return user.update(data);
};

const uploadImageService = async (id, file) => {
  const userExists = await User.findByPk(id);
  if (userExists.image) {
    const [path, fileName] = userExists.image.split("attach\\");
    try {
      const filesFounded = await fs.promises.readdir(
        join(__dirname, "../../attach")
      );
      filesFounded.map(async (f) => {
        if (f == fileName) {
          await fs.promises.unlink(userExists.image);
        }
        return;
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: user.service.js:40 ~ uploadImageService ~ error:",
        error
      );
    }
  }
  userExists.image = file.path;
  await userExists.save();
  return userExists.image;
};

module.exports = {
  updatePassService,
  updateEmailService,
  updateDataService,
  uploadImageService,
};
