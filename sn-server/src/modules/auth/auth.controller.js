const msgResponse = require("../../constants/message.json");
const {
  loginService,
  registerService,
  logoutService,
} = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const { email, first_name, last_name, dni, password } = req.body;
    const userRegisteredId = await registerService({
      email,
      first_name,
      last_name,
      dni,
      password,
    });
    console.info(
      `Service: register | Method: POST, register: User registered with id: ${userRegisteredId}`
    );
    return res.status(201).send({
      ok: true,
      message: msgResponse.auth.register,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(`Service: register | Method: POST, Error: ${error}`);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [token, user] = await loginService({
      email,
      password,
    });
    console.info(`Service: login | Method: POST, Login: ok`);
    return res.status(200).send({
      ok: true,
      message: msgResponse.auth.login,
      data: { token, user },
      error: [],
    });
  } catch (error) {
    console.error(`Service: login | Method: POST, Error: ${error}`);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await logoutService(req.user);
    console.info(`Service: logout | Method: POST, logout: ok`);
    const headers = {
      authorization: "",
    };
    res.set(headers);

    return res.status(200).json({
      ok: true,
      message: msgResponse.auth.logout,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(`Service: logout | Method: POST, Error: ${error}`);
    next(error);
  }
};

// const renewPassword = async (req, res, next) => {
//   try {
//     const { password } = req.body;
//     const { id } = req.user;
//     await renewPasswordService(id, password);
//     console.info(`Service: renewPassword | Method: POST, Renew password: ok`);
//     res.status(200).json({
//       ok: true,
//       message: msgResponse.auth.password.renew,
//       data: {},
//       error: [],
//     });
//   } catch (err) {
//     console.error(`Service: renewPassword | Method: POST, Error: ${err}`);
//     next(err);
//   }
// };

module.exports = {
  login,
  register,
  logout,
  // renewPassword,
};
