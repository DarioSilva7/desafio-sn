const createVerificationCode = () => {
  return Math.floor(
    Math.random() * parseInt("8" + "9".repeat(6 - 1)) +
      parseInt("1" + "0".repeat(6 - 1))
  ).toString();
};
module.exports = { createVerificationCode };
