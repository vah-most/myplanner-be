/*
 * Created on Wed Jul 20 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const mongoose = require("mongoose");
const config = require("config");

const debug = require("../debug")("db-mongo");

class MongoManager {
  serverAddress;
  isConnected = false;
  model = null;

  constructor() {
    this.serverAddress = `${config.get("db.protocol")}://${config.get(
      "db.server"
    )}:${config.get("db.port")}/${config.get("db.name")}`;
  }

  getIsConnected() {
    return this.isConnected;
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async connect() {
    debug("DB Address:", this.serverAddress);
    try {
      const result = await mongoose.connect(this.serverAddress);
      debug(`Connected to DB: ${config.get("db.name")}`);
      this.isConnected = true;
    } catch (error) {
      debug(`FAILED to connect to DB!`);
      this.isConnected = false;
    }
  }

  setModel(collectionName, schema) {
    try {
      this.model = new mongoose.model(collectionName, schema);
      return true;
    } catch (error) {
      debug(`FAILED to create model!`);
      return false;
    }
  }

  async delete(conditions) {
    if (!this.model) return false;
    try {
      const result = await this.model.deleteMany(conditions);
      debug("Documents removed from DB successfully.");
      return true;
    } catch (error) {
      debug("ERROR removing documents from DB: ", error);
      return false;
    }
  }

  async insert(documents) {
    if (!this.model) return false;
    try {
      const result = await this.model.insertMany(documents);
      debug("Documents inserted to DB successfully.");
      return true;
    } catch (error) {
      debug("ERROR inserting documents to DB: ", error);
      return false;
    }
  }

  async select(conditions) {
    if (!this.model) return false;
    try {
      const result = await this.model.find(conditions);
      debug("Documents fetched from DB successfully:", result);
      return result;
    } catch (error) {
      debug("ERROR inserting documents to DB: ", error);
      return null;
    }
  }
}

module.exports = MongoManager;
