// const mysql = require("mysql2/promise");
// const config = require(".");

// const initialize = async () => {
//   const connection = await mysql.createConnection({
//     host: "localhost", //"snmysqldb",
//     port: 3307,
//     user: "root",
//     password: "123456",
//   });
//   await connection.connect();

//   connection.query(`CREATE DATABASE IF NOT EXISTS ${config.db.db_name}`);
//   connection.end();
//   console.log("🚀 ~ file: pool.js:14 ~ initialize ~ DB CREADA ??");
// };

// module.exports = { initialize };
