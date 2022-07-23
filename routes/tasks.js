/*
 * Created on Tue Jul 19 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const express = require("express");
const router = express.Router();

const debug = require("../debug")("router-tasks");
const taskManager = require("../components/tasks");
const authenticate = require("../middlewares/authenticate");
const CODES = require("./codes");

router.get("/", [authenticate], async (req, res) => {
  const tasks = await taskManager.getTasks();

  debug("Tasks: ", tasks);
  res.status(CODES.SUCCESS).send(tasks);
});

router.get("/:id", [authenticate], async (req, res) => {
  const id = req.params.id;
  debug("Received ID:", id);
  if (!id || isNaN(id)) {
    return res
      .status(CODES.BAD_REQUEST)
      .send(CODES.errorMessageInvalid("Task-Id"));
  }

  const task = await taskManager.getTask(parseInt(id));
  if (!task) {
    return res.status(CODES.NOT_FOUND).send(CODES.errorMessageNotFound("Task"));
  }

  debug("Task: ", task);
  res.status(CODES.SUCCESS).send(task);
});

router.post("/", [authenticate], async (req, res) => {
  const tasks = req.body.tasks;
  debug("Received Tasks:", req.body, typeof tasks);
  if (typeof tasks !== "object") {
    return res
      .status(CODES.BAD_REQUEST)
      .send(CODES.errorMessageInvalid("Task-List"));
  }

  taskManager.setTasks(tasks);
  res.status(200).send();
});

module.exports = router;
