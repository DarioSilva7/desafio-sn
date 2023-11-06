function validationErrorResponse(res, errors) {
  return res.status(422).json({
    ok: false,
    message: "Los datos no cumplen los requisitos",
    data: {},
    error: errors.details.map((error) => {
      console.log(
        "🚀 ~ file: joiValidationResponse.js:9 ~ error:errors.details.map ~ error:",
        error
      );
      return { error: error.context?.label, message: error.message };
    }),
  });
}
module.exports = {
  validationErrorResponse,
};
