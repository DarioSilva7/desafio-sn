const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const db = require("../../config/database");
const UserToken = require("../userToken/userToken.model");
const Role = require("../role/role.model");

class User extends Model {
  async addUserToken(token, userId) {
    const exists = await UserToken.findOne({ where: { userId } });
    if (!exists) {
      await UserToken.create({
        token,
        userId,
        expiresAt: new Date(Date.now() + 3600 * 1000 * 24),
      });
    } else {
      await exists.update({
        token,
        expiresAt: new Date(Date.now() + 3600 * 1000 * 24),
      });
    }
    return;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: { args: 4, msg: "El id debe ser tipo UUID" },
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Nombre no debe ser nulo" },
        is: {
          // acepta caracteres de a-z, A-Z, ñ, espacios en blanco y letras con tildes:
          args: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
          msg: "El nombre solo permite caracteres de a-z, caracteres con tildes, enie y espacio en blanco",
        },
        len: {
          args: [3, 30],
          msg: "El nombre debe tener una longitud entre 3 y 30.",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Apellido no debe ser nulo" },
        is: {
          args: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
          msg: "El apellido solo permite caracteres de a-z, caracteres con tildes, enie y espacio en blanco",
        },
        len: {
          args: [3, 30],
          msg: "El apellido debe tener una longitud entre 3 y 30.",
        },
      },
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]{7,}$/, // Asegurar que el DNI tenga al menos 7 dígitos
          msg: "El DNI debe tener al menos 7 dígitos",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Es un correo invalido" },
        notNull: { msg: "Correo no debe ser nulo" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Contraseña no debe ser nulo" },
        is: {
          // acepta caracteres de a-z, A-Z, ñ, espacios en blanco y letras con tildes:
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/,
          msg: "Contraseña debe tener longitud minima de 7, al menos una mayuscula, al menos una minuscula, al menos un numero, al menos un caracter especial, por ej: @4Password",
        },
      },
    },
    image: {
      type: DataTypes.STRING(400),
      defaultValue:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  user.id = uuid.v4();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

User.afterCreate(async (user) => {
  const [userRole, created] = await Role.findOrCreate({
    where: { name: "user" },
    defaults: { name: "user" },
  });
  if (userRole) {
    await user.addRole(userRole);
  } else {
    await user.addRole(created);
  }
});

User.hasOne(UserToken, { as: "token", foreignKey: "userId" });

User.belongsToMany(Role, { through: "User_Role" });
Role.belongsToMany(User, { through: "User_Role" });

module.exports = User;
