/**
 * This function is used to generate a validation error JSON response (status 422 Unprocessable Entity) in the data validation context
 * @param {*} res
 * @param {*} errors
 * @returns
 */
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
