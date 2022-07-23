/*
 * Created on Thu Jul 21 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const debug = require("../debug")("users");
const MongoManager = require("../db/db");

const usersDbSchema = {
  username: { type: String },
  password: { type: String },
};

class UserManager {
  dbCollectionName = "users";
  dbManager = null;

  constructor() {
    this.users = [];
    this.init();
  }

  async init() {
    this.dbManager = new MongoManager();
    await this.dbManager.connect();
    if (this.dbManager.getIsConnected() === false) return; //TODO: handle ERROR
    this.dbManager.setModel(this.dbCollectionName, usersDbSchema);
  }

  async authenticate(username, password) {
    const result = await this.dbManager.select({
      username: username,
      password: password,
    });

    debug("Authentication-Result: ", result);
    return result;
  }
}

const userManager = new UserManager();
module.exports = userManager;
