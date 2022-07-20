/*
 * Created on Tue Jul 18 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const debug = require("../debug")("tasks");
const MongoManager = require("../db/db");

const tasksDbSchema = {
  title: { type: String },
  deadline: { type: Date },
  isCompleted: { type: Boolean, default: false },
  desc: { type: String, default: "" },
  groups: { type: [String], default: [] },
};

class TaskManager {
  dbCollectionName = "tasks";
  dbManager = null;

  constructor() {
    this.tasks = [];
    this.init();
  }

  async init() {
    this.dbManager = new MongoManager();
    await this.dbManager.connect();
    if (this.dbManager.getIsConnected() === false) return; //TODO: handle ERROR
    this.dbManager.setModel(this.dbCollectionName, tasksDbSchema);

    this.reloadTasks();
  }

  async reloadTasks() {
    if (this.dbManager.getIsConnected() === false) return []; //TODO: handle ERROR

    const tasks = await this.dbManager.select({});
    this.tasks = tasks ? tasks : [];
  }

  async getTasks() {
    return this.tasks;
  }

  async getTask(id) {
    return this.tasks.find((t) => t.id === id);
  }

  async setTasks(tasks) {
    this.tasks = tasks;

    if (this.dbManager.getIsConnected() === false) return; //TODO: handle ERROR
    let result;
    result = await this.dbManager.delete({});
    debug("Removed existing Tasks from DB: ", result);
    result = await this.dbManager.insert(this.tasks);
    debug("Stored Tasks in DB: ", result);
  }
}

const taskManager = new TaskManager();
module.exports = taskManager;
