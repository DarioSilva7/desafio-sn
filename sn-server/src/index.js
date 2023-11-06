const { app } = require("./app");
const config = require("./config");
// const { initialize } = require("./config/pool");
const db = require("./config/database");
const PORT = config.server_local_port || 3000;

const start = async () => {
  // try {
  //   await initialize();
  // } catch (error) {
  //   console.log(`🚀 Something went wrong with the database: ${error}`);
  // }
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    console.log(`Database ${db.sequelize.getDatabaseName()} is connected`);
  } catch (error) {
    console.log("🚀 ~ file: index.js:18 ~ start ~ error:", error);
  } finally {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  }
};

start();
