/*
 * Created on Tue Jul 18 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

const fakeTasks = [
  {
    id: 1,
    title: "Task1",
    deadline: "2022-06-27 12:00:00",
    isCompleted: false,
    desc: "Desc1 is a quite long task description...",
    groups: [],
  },
  {
    id: 2,
    title: "Task2",
    deadline: "",
    isCompleted: true,
    desc: "Desc2 is a quite long task description...",
    groups: ["Group1"],
  },
  {
    id: 3,
    title: "Task3",
    deadline: "2022-06-28 12:00:00",
    isCompleted: false,
    desc: "Desc3 is a quite long task description...",
    groups: ["Group1", "Group2", "Group3", "Group4", "Group5"],
  },
  {
    id: 4,
    title: "Task4",
    deadline: "",
    isCompleted: true,
    desc: "",
    groups: ["Group3"],
  },
  {
    id: 5,
    title: "Task5",
    deadline: "2022-07-05 12:00:00",
    isCompleted: false,
    desc: "Desc5 is a quite long task description...",
    groups: ["Group3"],
  },
];

class TaskManager {
  constructor() {
    this.tasks = [];
    this.reloadTasks();
  }

  reloadTasks() {
    //TODO: load tasks from DB
    this.tasks = fakeTasks;
  }

  async getTasks() {
    return this.tasks;
  }

  async getTask(id) {
    return this.tasks.find((t) => t.id === id);
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}

const taskManager = new TaskManager();

module.exports = taskManager;
