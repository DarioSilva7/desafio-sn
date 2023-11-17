const msgResponse = require("../../constants/message.json");
const {
  updatePassService,
  updateEmailAction,
  updateDataAction,
  uploadImageService,
  getUserService,
} = require("./user.service");

const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userData = await getUserService(id);
    console.info(`Service: getUser | Method: PUT, getUser: OK`);
    return res.status(201).send({
      ok: true,
      message: msgResponse.user.founded,
      data: { user: userData },
      error: [],
    });
  } catch (error) {
    console.error(`Service: getUser | Method: PUT, Error: ${error}`);
    next(error);
  }
};

const updatePass = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { password } = req.body;
    await updatePassService(id, password);
    console.info(`Service: updatePass | Method: PUT, updatePass: OK`);
    return res.status(201).send({
      ok: true,
      message: msgResponse.user.update.pass,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(`Service: updatePass | Method: PUT, Error: ${error}`);
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { email } = req.body;
    await updateEmailAction(id, email);
    console.info(`Service: updateEmail | Method: PUT, updateEmail: OK`);
    return res.status(201).send({
      ok: true,
      message: msgResponse.user.update.email,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(`Service: updateEmail | Method: PUT, Error: ${error}`);
    next(error);
  }
};

const updateData = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userUpdated = await updateDataAction(id, req.body);
    console.info(`Service: updateData | Method: PUT, updateData: OK`);
    return res.status(201).send({
      ok: true,
      message: msgResponse.user.update.data,
      data: { user: userUpdated },
      error: [],
    });
  } catch (error) {
    console.error(`Service: updateData | Method: PUT, Error: ${error}`);
    next(error);
  }
};

const uploadUserImage = async (req, res, next) => {
  try {
    const { id } = req.user;
    // if (!req.file) throw new Error("No se cargo archivo");
    if (!req.body.image) throw new Error("No se cargo archivo");

    const imageUpadted = await uploadImageService(id, req.body.image);
    console.info(
      `Service: uploadUserImage | Method: POST, uploadUserImage: image uploaded successfully`
    );
    res.status(200).json({
      ok: true,
      message: msgResponse.user.update.image,
      data: { image: imageUpadted },
      error: [],
    });
  } catch (error) {
    console.error(`Service: uploadUserImage | Method: POST, Error: ${error}`);
    next(error);
  }
};

module.exports = {
  getUser,
  updatePass,
  updateEmail,
  updateData,
  uploadUserImage,
};
