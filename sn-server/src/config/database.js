const { Sequelize, Op } = require("sequelize");
const config = require("./index");

console.log("🚀 ~ file: database.js:5 ~ config:", config);

const db = {
  sequelize: new Sequelize(
    config.db.db_name,
    config.db.db_user,
    config.db.db_password,
    {
      port: config.db.db_local_port,
      host: config.db.db_localhost,
      dialect: "mysql",
      dialectOptions: {
        connectTimeout: 5000,
      },
      timezone: "-03:00",
    }
  ),
  Sequelize,
  Op,
};
db.Sequelize = Sequelize;
db.Op = Op;

module.exports = db;
