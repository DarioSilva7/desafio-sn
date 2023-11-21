const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * This function is responsible for generating a token using the jsonwebtoken library
 * @param {*} payload
 * @returns
 */
const generateToken = (payload) => {
  console.log("🚀 ~ file: jwt.js:5 ~ generateToken ~ payload:", payload);
  return jwt.sign(payload, config.jwtKey, {
    expiresIn: "1d",
  });
};

/**
 * This function is responsible for verifying a token using the jsonwebtoken library
 * @param {string} token
 * @returns user data
 */
const verifyToken = (token) => {
  return jwt.verify(token, config.jwtKey, {
    algorithms: ["HS256"],
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
