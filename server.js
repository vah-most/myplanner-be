/*
 * Created on Tue Jul 18 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const config = require("config");
const express = require("express");
const helmet = require("helmet");

const debug = require("./debug")("server");
const cors = require("./middlewares/cors");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");

class ServerManager {
  app = null;

  constructor() {
    this.init();
  }

  init() {
    this.app = express();

    debug(`${config.app_name} Server started...`);

    this.app.use(helmet());
    this.app.use(express.json());

    this.app.use(cors);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/tasks", tasksRouter);
  }
  start() {
    this.app.listen(config.get("api.port"), () => {
      debug(`Listening to port ${config.get("api.port")}`);
    });
  }
}

module.exports = ServerManager;
