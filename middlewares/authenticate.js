/*
 * Created on Thu Jul 21 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const jwt = require("jsonwebtoken");
const config = require("config");

const debug = require("../debug")("middle-auth");
const CODES = require("../routes/codes");

function authenticate(req, res, next) {
  try {
    const token = req.get("x-auth-token");
    debug("Received Auth-Token:", JSON.stringify(token));
    const user = jwt.verify(token, config.get("token_key"));
    debug("Received User:", user);
    if (typeof user._id === "undefined")
      throw "Received token did not provide any ID.";
    res.locals.user = user;

    next();
  } catch (error) {
    res.status(CODES.ACCESS_DENIED).send(CODES.errorMessageAccessDenied());
  }
}

module.exports = authenticate;
