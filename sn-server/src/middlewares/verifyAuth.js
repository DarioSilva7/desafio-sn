const boom = require("@hapi/boom");
const UserToken = require("../modules/userToken/userToken.model");
const { verifyToken } = require("../jwt/jwt");

const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(boom.unauthorized("Token de autenticación no proporcionado"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(boom.unauthorized("Token de autenticación no proporcionado"));
    }
    const tokenFounded = await findTokenInDB(token);
    if (!tokenFounded) {
      return next(boom.unauthorized("Debe iniciar sesion"));
    }
    const payload = verifyToken(token);
    if (!payload) {
      return next(boom.unauthorized("Token inválido o expirado"));
    }
    req.user = payload;
    console.info(`Service: verifyAuth | Verified token: ok. ${payload}`);
    next();
  } catch (error) {
    return next(boom.unauthorized("Debe iniciar sesion"));
  }
};

const findTokenInDB = async (token) => {
  return UserToken.findOne({
    where: {
      token,
    },
  });
};

module.exports = {
  verifyAuth,
};
