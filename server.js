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

const app = express();

debug(`${config.app_name} Server started...`);

app.use(helmet());
app.use(express.json());

app.use(cors);
app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);

app.listen(config.get("api.port"), () => {
  debug(`Listening to port ${config.get("api.port")}`);
});
