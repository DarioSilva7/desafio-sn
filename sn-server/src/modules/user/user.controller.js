const msgResponse = require("../../constants/message.json");
const {
  updatePassService,
  updateEmailService,
  updateDataService,
  uploadImageService,
} = require("./user.service");

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
    await updateEmailService(id, email);
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
    const userUpdated = await updateDataService(id, req.body);
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
    if (!req.file) throw new Error("No se cargo archivo");

    const imageUpadted = await uploadImageService(id, req.file);
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
  updatePass,
  updateEmail,
  updateData,
  uploadUserImage,
};
