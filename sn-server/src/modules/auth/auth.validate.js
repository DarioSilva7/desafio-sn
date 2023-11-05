const Joi = require("joi");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const {
  validationErrorResponse,
} = require("../../utils/joiValidationResponse");
const User = require("../user/user.model");
const msgErrors = require("../../constants/errorMessage.json");

const options = {
  first_name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/))
    .required()
    .label(
      "Nombre es requerido, debe tener un minimo de 3 y un maximo de 30 caracteres, solo caracteres de a-z"
    ),
  last_name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/))
    .required()
    .label(
      "Apellido es requerido, debe tener un minimo de 3 caracteres, solo caracteres de a-z"
    ),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .label("El correo debe ser valido"),
  dni: Joi.number()
    .integer()
    .min(10000000)
    .max(99999999)
    .required()
    .label("El dni debe ser valido"),
  password: Joi.string()
    .min(7)
    .max(30)
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/
      )
    )
    .label(
      "Contraseña debe tener longitud minima de 7, al menos una mayuscula, al menos una minuscula, al menos un numero, al menos un caracter especial, por ej: @4Password"
    ),
  confirm: Joi.string()
    .min(7)
    .max(30)
    .valid(Joi.ref("password"))
    .required()
    .label("Las contraseñas no coinciden"),
};

const blueprintRegister = Joi.object().keys({
  first_name: options.first_name,
  last_name: options.last_name,
  email: options.email,
  password: options.password,
  confirm: options.confirm,
  dni: options.dni,
});
const validateRegister = (req, res, next) => {
  const validationResult = blueprintRegister.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (validationResult.error) {
    return validationErrorResponse(res, validationResult.error);
  }
  next();
};

const blueprintLogin = Joi.object().keys({
  email: options.email,
  password: options.password,
});
const validateLogin = async (req, res, next) => {
  const validationResult = blueprintLogin.validate(req.body, {
    abortEarly: false,
    convert: false,
  });
  if (validationResult.error) {
    return validationErrorResponse(res, validationResult.error);
  }
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    next(boom.unauthorized(msgErrors.auth.invalidCredentials));
  }
  next();
};

const emailVerification = async (req, res, next) => {
  const userExists = await User.findOne({ where: { email: req.body.email } });
  if (userExists) {
    next(
      boom.conflict(
        "No es posible registrar el usuario provisto, el correo ya se encuentra registrado como usuario en la plataforma."
      )
    );
  }
  next();
};

const blueprintRenewPass = Joi.object().keys({
  password: options.password,
  confirm: options.confirm,
});
const validateRenewPassword = async (req, res, next) => {
  const validationResult = blueprintRenewPass.validate(req.body, {
    abortEarly: false,
    convert: false,
  });
  if (validationResult.error) {
    return validationErrorResponse(res, validationResult.error);
  }
  const { password: prevPassword } = await User.findByPk(req.user.id);
  if (await bcrypt.compare(req.body.password, prevPassword))
    next(boom.badRequest("La contraseña debe ser distinta de la anterior"));
  next();
};

const blueprintRenewEmail = Joi.object().keys({
  email: options.email,
});
const validateRenewEmail = async (req, res, next) => {
  const { email } = req.body;
  const validationResult = blueprintRenewEmail.validate(
    { email },
    {
      abortEarly: false,
      convert: false,
    }
  );
  if (validationResult.error) {
    return validationErrorResponse(res, validationResult.error);
  }
  const { email: prevEmail } = await User.findByPk(req.user.id);
  if (email == prevEmail)
    next(boom.badRequest("El email debe ser distinto del actual"));
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  emailVerification,
  validateRenewPassword,
  validateRenewEmail,
};
