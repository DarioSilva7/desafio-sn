const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (payload) => {
  console.log("🚀 ~ file: jwt.js:5 ~ generateToken ~ payload:", payload);
  return jwt.sign(payload, config.jwtKey, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtKey, {
    algorithms: ["HS256"],
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
