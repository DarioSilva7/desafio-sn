const boom = require("@hapi/boom");

const checkRole = (role) => async (req, res, next) => {
  try {
    console.log(
      "🚀 ~ file: checkRole.js:9 ~ checkRole ~ req.user.roles:",
      Object.keys(req) //.user.roles
    );
    if (req.user.roles.includes(role)) next();
    else next(boom.forbidden("El usuario no tiene acceso a este servicio"));
  } catch (error) {
    next(error);
  }
};

module.exports = { checkRole };
