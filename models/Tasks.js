const Task = require("./Task");

module.exports.CreateTask = async (task, value) => {
  try {
    const todo = await Task.create({ task: task, status: value });
    return todo;
  } catch (error) {
    throw Error(error);
  }
};
