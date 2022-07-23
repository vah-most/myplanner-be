/*
 * Created on Thu Jul 21 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const debug = require("../debug")("auth");
const userManager = require("../components/users");
const CODES = require("./codes");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    debug("Received Authentication Params:", req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      debug("Authentication Error!");
      return res.status(401).send("username:Invalid username or password.");
    }

    const result = await userManager.authenticate(username, password);
    debug("Authentication Result:", result);
    if (!result || !result.length) {
      debug("Authentication Error!");
      return res
        .status(CODES.ACCESS_DENIED)
        .send("username:Invalid username or password.");
    }

    // Create token
    const token = jwt.sign({ ...result[0]._doc }, config.get("token_key"), {
      expiresIn: "2h",
    });
    debug("Generated JWT:", token);
    return res.status(CODES.SUCCESS).send(token);
  } catch (error) {
    debug("Authentication Error: ", error);
    res
      .status(CODES.ACCESS_DENIED)
      .send("username:Invalid username or password.");
  }
});

module.exports = router;
