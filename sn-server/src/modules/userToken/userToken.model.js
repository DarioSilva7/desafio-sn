const { Model, DataTypes } = require("sequelize");
const db = require("../../config/database");

class UserToken extends Model {}

UserToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: { args: 4, msg: "El id debe ser tipo UUID" },
      },
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "User_Token",
  }
);

module.exports = UserToken;
