const multer = require("multer");
const { ValidationError } = require("sequelize");

/**
 * Esta función actúa como un middleware de manejo de errores para manejar instancias de errores Boom en una aplicación Express. Si el error recibido es de tipo Boom, formatea la respuesta de manera específica; de lo contrario, pasa el control al siguiente middleware en la cadena.
 * @param {*} error Objeto de error que se está manejando.
 * @param {*} req Objeto de solicitud HTTP Express.
 * @param {*} res Objeto de respuesta HTTP Express.
 * @param {*} next Función para pasar el control al siguiente middleware en la cadena.
 */
function boomErrorHandle(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    return res.status(output.statusCode).json({
      ok: false,
      message: "Ocurrio un error",
      data: {},
      error: [{ error: output.payload.error, message: output.payload.message }],
    });
  } else {
    next(error);
  }
}

function errorHandle(error, req, res, next) {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      ok: false,
      message: "Algo salio mal",
      data: {},
      error: error.errors.map((e) => {
        return { error: e.value, message: e.message };
      }),
    });
  } else {
    return res.status(500).json({
      ok: false,
      message: "Algo salio mal",
      data: {},
      error: [{ error: "", message: error.message }],
    });
  }
}

/**
 * Esta función actúa como un middleware de manejo de errores para manejar instancias de errores relacionados con Multer en una aplicación Express. Si el error recibido es una instancia de multer.MulterError, formatea la respuesta JSON de manera específica; de lo contrario, pasa el control al siguiente middleware en la cadena.
 * @param {*} err Objeto de error que se está manejando.
 * @param {*} req Objeto de solicitud HTTP Express.
 * @param {*} res Objeto de respuesta HTTP Express.
 * @param {*} next Función para pasar el control al siguiente middleware en la cadena.
 */
function multerErrorHandle(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      ok: false,
      message: "Multer error",
      data: {},
      error: [{ error: "Error de carga de archivo: " + err.message }],
    });
  } else {
    next(err);
  }
}

module.exports = {
  errorHandle,
  boomErrorHandle,
  multerErrorHandle,
};
