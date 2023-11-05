const multer = require("multer");
const { ValidationError } = require("sequelize");

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

function multerErrorHandle(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    console.log(
      "🚀 ~ file: error.handler.js:54 ~ multerErrorHandle ~ err:",
      Object.keys(err)
    );
    // Si es un error de multer, puede ser debido a un tipo de archivo no válido o tamaño excedido, entre otros.
    res
      .status(400)
      .json({ error: "Error de carga de archivo: " + err.message });
  } else {
    // Si no es un error de multer, pasa al siguiente middleware para su manejo.
    next(err);
  }
}

module.exports = {
  errorHandle,
  boomErrorHandle,
  multerErrorHandle,
};
