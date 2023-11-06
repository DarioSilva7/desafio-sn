const msgResponse = require("../../constants/message.json");
const { createRoleService } = require("./role.service");

const createRole = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log("🚀 ~ file: role.controller.js:7 ~ createRole ~ name:", name);
    const roleCreated = await createRoleService(name);
    console.info(
      `Service: createRole | Method: POST, createRole: role created with id: ${roleCreated.id}`
    );
    return res.status(201).send({
      ok: true,
      message: msgResponse.role.created,
      data: { role: roleCreated },
      error: [],
    });
  } catch (error) {
    console.error(`Service: createRole | Method: POST, Error: ${error}`);
    next(error);
  }
};

module.exports = {
  createRole,
};
