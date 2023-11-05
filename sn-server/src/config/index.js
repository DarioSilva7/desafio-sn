require("dotenv").config({ path: ".env" });
const { configSchema } = require("../schemas/config.schemas");

const { error, value: envVars } = configSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  jwtKey: envVars.JWT_SECRET,
  db: {
    db_user: envVars.MYSQLDB_USER,
    db_dockerhost: envVars.MYSQLDB_DOCKERHOST,
    db_localhost: envVars.MYSQLDB_LOCALHOST,
    db_password: envVars.MYSQLDB_PASSWORD,
    db_root_password: envVars.MYSQLDB_ROOT_PASSWORD,
    db_name: envVars.MYSQLDB_DATABASE,
    db_dialect: envVars.DIALECT,
    db_local_port: envVars.MYSQLDB_LOCAL_PORT,
    db_docker_port: envVars.MYSQLDB_DOCKER_PORT,
  },
  server_local_port: envVars.NODE_LOCAL_PORT,
  server_docker_port: envVars.NODE_DOCKER_PORT,
  cors_origin: envVars.CORS_ORIGIN,
  mail: {
    userGmail: envVars.EMAIL_USER_GMAIL,
    passGmail: envVars.EMAIL_PASS_GMAIL,
  },
};

module.exports = config;
