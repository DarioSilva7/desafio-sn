const msgResponse = require("../../constants/message.json");
const {
  updatePassService,
  updateEmailService,
  updateDataService,
} = require("../user/user.service");
const {
  addRoleService,
  getUsersService,
  userSoftDeleteService,
  activeUserService,
} = require("./admin.service");

const addRole = async (req, res, next) => {
  try {
    const { roleId } = req.body;
    const { userId } = req.params;
    const userUpdated = await addRoleService(roleId, userId);
    console.info(
      `Service: addRole | Method: PUT, addRole: role added to user with id: ${userId}`
    );
    return res.status(201).send({
      ok: true,
      message: msgResponse.role.added,
      data: { user: userUpdated },
      error: [],
    });
  } catch (error) {
    console.error(`Service: addRole | Method: PUT, Error: ${error}`);
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    let { page, limit, status } = req.query;

    const users = await getUsersService(
      limit ? (!isNaN(parseInt(limit)) ? parseInt(limit) : 10) : 10,
      page ? (!isNaN(parseInt(page)) ? parseInt(page) : 1) : 1,
      status
        ? !isNaN(parseInt(status))
          ? parseInt(status) > 1
            ? null
            : parseInt(status)
          : null
        : null
    );
    console.info(
      `Service: getUsers | Method: GET, getUsers: users founded: OK`
    );
    return res.status(200).send({
      ok: true,
      message: msgResponse.users.found,
      data: { users },
      error: [],
    });
  } catch (error) {
    console.error(`Service: getUsers | Method: GET, Error: ${error}`);
    next(error);
  }
};

const userSoftDelete = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userSoftDeleteService(userId);
    console.info(
      `Service: userSoftDelete | Method: DELETE, userSoftDelete: users founded: OK`
    );
    return res.status(200).send({
      ok: true,
      message: msgResponse.user.softDeleted,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(`Service: userSoftDelete | Method: DELETE, Error: ${error}`);
    next(error);
  }
};

const activeUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await activeUserService(userId);
    console.info(
      `Service: activeUser | Method: PUT, activeUser: user active: OK`
    );
    return res.status(200).send({
      ok: true,
      message: msgResponse.user.activated,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(`Service: activeUser | Method: PUT, Error: ${error}`);
    next(error);
  }
};

const updateUserPassByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    await updatePassService(userId, password);
    console.info(
      `Service: updateUserPassByAdmin | Method: PUT, updateUserPassByAdmin: OK`
    );
    return res.status(201).send({
      ok: true,
      message: msgResponse.admin.updateUser.pass,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(
      `Service: updateUserPassByAdmin | Method: PUT, Error: ${error}`
    );
    next(error);
  }
};

const updateUserEmailByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;
    await updateEmailService(userId, email);
    console.info(
      `Service: updateUserEmailByAdmin | Method: PUT, updateUserEmailByAdmin: OK`
    );
    return res.status(201).send({
      ok: true,
      message: msgResponse.admin.updateUser.email,
      data: {},
      error: [],
    });
  } catch (error) {
    console.error(
      `Service: updateUserEmailByAdmin | Method: PUT, Error: ${error}`
    );
    next(error);
  }
};

const updateUserDataByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userUpdated = await updateDataService(userId, req.body);
    console.info(
      `Service: updateUserDataByAdmin | Method: PUT, updateUserDataByAdmin: OK`
    );
    return res.status(201).send({
      ok: true,
      message: msgResponse.admin.updateUser.data,
      data: { user: userUpdated },
      error: [],
    });
  } catch (error) {
    console.error(
      `Service: updateUserDataByAdmin | Method: PUT, Error: ${error}`
    );
    next(error);
  }
};

const uploadUserImageByAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!req.file) throw new Error("No se cargo archivo");

    const imageUpadted = await uploadImageService(userId, req.file);
    console.info(
      `Service: uploadUserImageByAdmin | Method: POST, uploadUserImageByAdmin: image uploaded successfully`
    );
    res.status(200).json({
      ok: true,
      message: msgResponse.admin.updateUser.image,
      data: { image: imageUpadted },
      error: [],
    });
  } catch (error) {
    console.error(
      `Service: uploadUserImageByAdmin | Method: POST, Error: ${error}`
    );
    next(error);
  }
};

module.exports = {
  addRole,
  getUsers,
  userSoftDelete,
  activeUser,
  updateUserDataByAdmin,
  updateUserEmailByAdmin,
  updateUserPassByAdmin,
  uploadUserImageByAdmin,
};
