/* eslint-disable no-prototype-builtins */
export const validateChangePass = (input) => {
  console.log(
    "🚀 ~ file: validations.js:3 ~ validateChangePass ~ input:",
    input
  );
  let errors = {};
  if (!input.password) {
    errors.password = "Password is required";
  }
  if (input.password.length < 7 || input.password.length > 30) {
    errors.password =
      "Password must be a minimum of 7 characters and a maximum of 30 characters";
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/.test(
      input.password
    )
  ) {
    errors.password =
      "Password must have a minimum length of 7, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character, for example: @4Password";
  }

  if (!input.confirm) {
    errors.confirm = "Confirm password is required";
  }
  if (input.confirm.length < 7 || input.confirm.length > 30) {
    errors.confirm =
      "Confirm password must be a minimum of 7 characters a maximum of 30 characters";
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/.test(
      input.confirm
    )
  ) {
    errors.confirm =
      "Confirm password must have a minimum length of 7, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character, for example: @4Password";
  }
  console.log(
    "🚀 ~ file: validations.js:40 ~ validateChangePass ~ input.password:",
    input.password
  );
  console.log(
    "🚀 ~ file: validations.js:41 ~ validateChangePass ~ input.confirm:",
    input.confirm
  );
  if (input.password !== input.confirm) {
    errors.confirm = "Passwords do not match";
  }
  if (!errors.confirm && !errors.confirm) errors = {};
  return errors;
};

export const validateInputsChangePass = (input) => {
  let errors = {};
  if (!input.password) {
    errors.password = "Password is required";
  }
  if (!input.confirm) {
    errors.confirm = "Confirm password is required";
  }
  return errors;
};
