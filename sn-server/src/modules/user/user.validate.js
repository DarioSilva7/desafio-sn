const boom = require("@hapi/boom");
const Joi = require("joi");
const User = require("./user.model");
const {
  validationErrorResponse,
} = require("../../utils/joiValidationResponse");

const validateUserIdByParams = async (req, res, next) => {
  const { userId } = req.params;
  //   if (!userId) next(boom.badRequest("El id del usuario es requerido"));

  const schema = Joi.object({
    userId: Joi.string().guid({ version: "uuidv4" }).required(),
  });
  const validationResult = schema.validate({ userId });
  if (validationResult.error) {
    return validationErrorResponse(res, validationResult.error);
  }
  const userExists = await User.findByPk(userId);

  if (!userExists) next(boom.notFound("No se encuentra usuario"));
  else next();
};

const validateUserDeleted = async (req, res, next) => {
  const userFounded = await User.findByPk(req.params.userId);
  if (userFounded.active == false)
    next(boom.badRequest("El usuario ya se encuentra eliminado logicamente"));
  next();
};

const validateUserAlreadyActive = async (req, res, next) => {
  const userFounded = await User.findByPk(req.params.userId);
  if (userFounded.active == true)
    next(boom.badRequest("El usuario ya se encuentra activo"));
  next();
};

const validateUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({
    where: { email },
  });
  if (!userExists) {
    next(boom.notFound("No se encuentra usuario con el correo provisto"));
  }
  next();
};

module.exports = {
  validateUserIdByParams,
  validateUserDeleted,
  validateUserAlreadyActive,
  validateUserByEmail,
};
