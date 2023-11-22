const joi = require("joi");

const configSchema = joi
  .object({
    JWT_SECRET: joi.string().required(),
    MYSQLDB_USER: joi.string().required(),
    MYSQLDB_DOCKERHOST: joi.string().required(),
    MYSQLDB_LOCALHOST: joi.string().required(),
    MYSQLDB_PASSWORD: joi.string().required(),
    MYSQLDB_ROOT_PASSWORD: joi.string().required(),
    MYSQLDB_DATABASE: joi.string().required(),
    DIALECT: joi.string().required(),
    MYSQLDB_LOCAL_PORT: joi.string().required(),
    MYSQLDB_DOCKER_PORT: joi.string().required(),
    NODE_LOCAL_PORT: joi.string().required(),
    NODE_DOCKER_PORT: joi.string().required(),
    CORS_ORIGIN: joi.string().required(),
    EMAIL_USER_GMAIL: joi.string().required(),
    EMAIL_PASS_GMAIL: joi.string().required(),
    BASE_URL: joi.string().required(),
  })
  .unknown()
  .required();

module.exports = { configSchema };
