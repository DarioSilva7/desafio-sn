/* eslint-disable no-prototype-builtins */
export const validateChangePass = (formState) => {
  let errors = {};
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/.test(
      formState.password
    )
  ) {
    errors.password =
      "Password must have a minimum length of 7, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character, for example: @4Password";
  }
  if (formState.password !== formState.confirm) {
    errors.confirm = "Passwords do not match";
  } else errors = {};
  return errors;
};

export const validateLogin = (formState) => {
  let errors = {};
  if (
    !/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formState.email)
  ) {
    errors.email = "Invalid email";
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/.test(
      formState.password
    )
  ) {
    errors.password =
      "Password must have a minimum length of 7, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character, for example: @4Password";
  }
  return errors;
};

export const validateInputsChangePass = (formState) => {
  let errors = {};
  if (!formState.password) {
    errors.password = "Password is required";
  }
  if (!formState.confirm) {
    errors.confirm = "Confirm password is required";
  }
  return errors;
};

export const validateRegister = (formState) => {
  let errors = {};
  if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formState.first_name)) {
    errors.first_name =
      "Firstname must have a minimum of 3 and a maximum of 30 characters, only characters from a-z";
  }
  if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(formState.last_name)) {
    errors.last_name =
      "Lastname must have a minimum of 3 and a maximum of 30 characters, only characters from az";
  }
  if (formState.dni < 1000000 || formState.dni > 99999999) {
    errors.dni = "DNI must be less than 99999999 and bigger than 1000000";
  }
  if (
    !/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formState.email)
  ) {
    errors.email = "Invalid email";
  }
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=_])(?=.*[a-zA-Z\d@#$%^&+=]).{7,}$/.test(
      formState.password
    )
  ) {
    errors.password =
      "Password must have a minimum length of 7, at least one uppercase letter, at least one lowercase letter, at least one number, at least one special character, for example: @4Password";
  }
  if (formState.password !== formState.confirm) {
    errors.confirm = "Passwords do not match";
  }
  return errors;
};

export const validateInputsRegister = (formState) => {
  let errors = {};
  if (!formState.first_name) {
    errors.first_name = "Firstname is required";
  }
  if (!formState.last_name) {
    errors.first_name = "Lastname is required";
  }
  if (!formState.dni) {
    errors.dni = "DNI is required";
  }
  if (!formState.password) {
    errors.password = "Password is required";
  }
  if (!formState.confirm) {
    errors.confirm = "Confirm password is required";
  }
  return errors;
};
