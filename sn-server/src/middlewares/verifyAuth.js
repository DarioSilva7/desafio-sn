const boom = require("@hapi/boom");
const UserToken = require("../modules/userToken/userToken.model");
const { verifyToken } = require("../jwt/jwt");

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const tokenFounded = await UserToken.findOne({
      where: {
        token,
      },
    });
    if (!tokenFounded) {
      next(boom.unauthorized("Debe iniciar sesion"));
    } else {
      const payload = verifyToken(token);
      // TODO VERIFICAR TIEMPO DE CADUCIDAD
      req.user = payload;
      console.info(`Service: verifyAuth | Verified token: ok. ${payload}`);
      next();
    }
  } catch (error) {
    next(boom.unauthorized("Debe iniciar sesion"));
  }
};

module.exports = {
  verifyAuth,
};
