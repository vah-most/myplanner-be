/*
 * Created on Tue Jul 19 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const config = require("config");
const debug = require("debug");

const appDebug = function (name) {
  return debug(`${config.get("debug_name")}:${name}`);
};

module.exports = appDebug;
