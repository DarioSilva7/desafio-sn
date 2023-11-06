const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/index.js");
const {
  boomErrorHandle,
  multerErrorHandle,
  errorHandle,
} = require("./middlewares/error.handle.js");

const { mainRoutes } = require("./routes/mainRoutes.js");

const app = express();

const whiteList = config.cors_origin.split(",");
app.use(
  cors({
    origin: whiteList,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.set("trust proxy", true);

app.use("/ping", (req, res) => res.send("PONG!"));
app.use("/api", mainRoutes);

app.use(boomErrorHandle);
app.use(multerErrorHandle);
app.use(errorHandle);

module.exports = { app };
