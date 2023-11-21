const boom = require("@hapi/boom");

/**
 * This function is responsible for validating the role of the logged in user
 * @param {string} role
 * @returns
 */
const checkRole = (role) => async (req, res, next) => {
  try {
    if (req.user.roles.includes(role)) next();
    else next(boom.forbidden("El usuario no tiene acceso a este servicio"));
  } catch (error) {
    next(error);
  }
};

module.exports = { checkRole };
