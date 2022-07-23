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
const compression = require("compression");

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
    this.app.use(compression());
    this.app.use(express.json());

    this.app.use(cors);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/tasks", tasksRouter);
  }
  start() {
    const port = process.env.PORT || config.get("api.port");
    this.app.listen(port, () => {
      debug(`Listening to port ${port}`);
    });
  }
}

module.exports = ServerManager;
