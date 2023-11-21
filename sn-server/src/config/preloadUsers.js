const { faker } = require("@faker-js/faker");
const User = require("../modules/user/user.model");

const password = "@4Password";
const personsArray = [];

/**
 * This function is responsible for preloading the database with some random users.
 * @returns Boolean
 */
const preloadUsers = async () => {
  const usersQuantity = await User.count();
  console.log(
    "🚀 ~ file: preloadUsers.js:10 ~ preloadUsers ~ usersQuantity:",
    usersQuantity
  );
  if (usersQuantity < 45) {
    for (let i = 0; i < 45; i++) {
      const dni = Math.random() * (99999999 - 1000000) + 1000000;
      const payload = {
        email: faker.internet.email(),
        first_name: faker.person.first_name(),
        last_name: faker.person.lastName(),
        dni,
        image: faker.image.url(),
        birthdate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
        password,
        confirm: password,
      };
      personsArray.push(User.create(payload));
    }
    await Promise.all(personsArray);
    return true;
  }
  return false;
};

module.exports = { preloadUsers };
