const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");
const db = require("../../config/database");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: { args: 4, msg: "El id debe ser tipo UUID" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Nombre no debe ser nulo" },
        is: {
          // acepta caracteres de a-z, A-Z, ñ, espacios en blanco y letras con tildes:
          args: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,
          msg: "El rol solo permite caracteres de a-z, caracteres con tildes, enie y espacio en blanco",
        },
        len: {
          args: [3, 12],
          msg: "El rol debe tener una longitud entre 3 y 12.",
        },
      },
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "Role",
  }
);

Role.beforeCreate(async (role) => {
  role.id = uuid.v4();
});

module.exports = Role;
